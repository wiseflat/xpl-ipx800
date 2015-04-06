var Xpl = require('xpl-api');
var fs = require('fs');
var os = require('os');
var net = require('net');
var pjson = require('../package.json');

function wt(device, options) {
	options = options || {};
	this._options = options;
	options.xplSource = options.xplSource || "bnz-ipx800."+os.hostname();
	this.xpl = new Xpl(options);
	
        this.configFile = "/etc/wiseflat/ipx800.config.json";
        this.configHash = [];
	
	this.version = pjson.version;

	this.client = new net.Socket();
};

module.exports = wt;

var proto = {
    
        _init: function(callback) {
                var self = this;

                self.xpl.bind(function(error) {
                        if (error) {
                                return callback(error);
                        }

                        self._log("XPL is ready");
                        callback(null,  self.xpl);
                });
                
        },

	_log: function(log) {
		/*if (!this._configuration.xplLog) {
			return;
		}*/
                
		console.log('xpl-ipx800 -', log);
	},

	_sendXplStat: function(body, schema) {
                var self = this;                
                self.xpl.sendXplStat(
                        body,
                        schema
                );
        },   
        	
        /*
         *  Config xPL message
         */
        
        readConfig: function(callback) {
                var self = this;
                fs.readFile(self.configFile, { encoding: "utf-8"}, function (err, body) {
                        if (err) self._log("file "+self.configFile+" is empty ...");
                        else {
                            self.configHash = JSON.parse(body);
                        }
                });
        },

        sendConfig: function(callback) {
                var self = this;
                self._sendXplStat(self.configHash, 'ipx800.config');
        },
        
        writeConfig: function(body) {
                var self = this;
		self.configHash.version = self.version;
                self.configHash.enable = body.enable;
                self.configHash.host = body.host;
		self.configHash.port = body.port;
                fs.writeFile(self.configFile, JSON.stringify(self.configHash), function(err) {
                        if (err) self._log("file "+self.configFile+" was not saved to disk ...");
			else self.sendConfig();
                });
        },

        sendM2M: function(body){
		var self = this;
		if (!self.configHash.enable) {
			self._log('from xPL - xpl-cmnd - the service is disabled / message: ', body);
			return;
		}
		
		self.client.connect(self.configHash.port, self.configHash.host, function(){
			self.client.write('Set'+body.device+body.command);
		});
		
		self.client.on('error', function(e) {
			if(e.code == 'ECONNREFUSED') {
				self._log('from xPL - xpl-cmnd - ECONNREFUSED - Is the server running at', self.configHash.port);
			}
			
			else if(e.code == 'ETIMEDOUT') {
				self._log('from xPL - xpl-cmnd - ETIMEDOUT - Is the server running at', self.configHash.port);
			}
			
			else self._log('from xPL - xpl-cmnd - ', e.code, ' - unknown error');
		});

		self.client.on('data', function(data) {
			data = data.toString().replace(/(\r\n|\n|\r|\s+)/gm,'');
			//self._log('response data: /'+data+'/');
			if (data == 'Success') {
				self._sendXplStat(body, 'ipx800.basic');
			}
			else {
				self._log('from xPL - xpl-cmnd - Error ersponse - /'+data+'/');
			}
			self.client.destroy();
		});
		
		/*client.on('close', function() {
			self._log('Connection closed');
		});*/
		
	}
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
