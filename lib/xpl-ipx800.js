var Xpl = require('xpl-api');
var fs = require('fs');
var os = require('os');
//var http = require('http');
var net = require('net');

function wt(device, options) {
	options = options || {};
	this._options = options;
	options.xplSource = options.xplSource || "bnz-ipx800."+os.hostname();
	this.xpl = new Xpl(options);
	
        this.configFile = "/etc/wiseflat/ipx800.config.json";
        this.configHash = [];
	
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

                        console.log("XPL is ready");
                        callback(null,  self.xpl);
                });
                
        },

	_log: function() {
		if (!this._configuration.xplLog) {
			return;
		}
                
		console.log.apply(console, arguments);
	},

	_sendXplStat: function(body, schema) {
                var self = this;                
                self.xpl.sendXplStat(
                        body,
                        schema
                );
		console.log('to xPL - xpl-stat - '+ JSON.stringify(body));
        },   
        	
        /*
         *  Config xPL message
         */
        
        readConfig: function(callback) {
                var self = this;
                fs.readFile(self.configFile, { encoding: "utf-8"}, function (err, body) {
                        if (err) console.log("file "+self.configFile+" is empty ...");
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
                self.configHash.enable = body.enable;
                self.configHash.host = body.host;
		self.configHash.port = body.port;
                fs.writeFile(self.configFile, JSON.stringify(self.configHash), function(err) {
                        if (err) console.log("file "+self.configFile+" was not saved to disk ...");
			else self.sendConfig();
                });
        },

        sendM2M: function(body){
		var self = this;
		if (!self.configHash.enable) {
			console.log('from xPL - xpl-cmnd - the service is disabled / message: ', body);
			return;
		}
		/*var client = net.connect(self.configHash.port, self.configHash.host, function(){
			client.on('data', function(data) {
				data = data.toString().replace(/(\r\n|\n|\r|\s+)/gm,'');
				console.log('response data: /'+data+'/');
				if (data == 'Success') {
					self._sendXplStat(body, 'ipx800.basic');
				}
				else {
					console.log('response error: /'+data+'/');
				}
				client.destroy();
			});
		
			client.on('close', function() {
				console.log('Connection closed');
			});
			
			client.on('error', function(err) {
				console.log('from xPL - xpl-cmnd - :', err.message);
			});
			
			client.write('Set'+body.device+body.command);
		});*/
		
		self.client.connect(self.configHash.port, self.configHash.host, function(){
			self.client.write('Set'+body.device+body.command);
		});
		
		self.client.on('error', function(e) {
			if(e.code == 'ECONNREFUSED') {
				console.log('from xPL - xpl-cmnd - ECONNREFUSED - Is the server running at', self.configHash.port);
			}
			
			else if(e.code == 'ETIMEDOUT') {
				console.log('from xPL - xpl-cmnd - ETIMEDOUT - Is the server running at', self.configHash.port);
			}
			
			else console.log('from xPL - xpl-cmnd - ', e.code, ' - unknown error');
		});

		self.client.on('data', function(data) {
			data = data.toString().replace(/(\r\n|\n|\r|\s+)/gm,'');
			console.log('response data: /'+data+'/');
			if (data == 'Success') {
				self._sendXplStat(body, 'ipx800.basic');
			}
			else {
				console.log('from xPL - xpl-cmnd - Error ersponse - /'+data+'/');
			}
			self.client.destroy();
		});
		
		/*client.on('close', function() {
			console.log('Connection closed');
		});*/
		
	}
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
