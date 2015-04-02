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
                });
        },

        sendM2M: function(message){
		var self = this;
		console.log('port:'+self.configHash.port, ' / host'+ self.configHash.host);
		var client = net.connect(self.configHash.port, self.configHash.host, function(){
			client.on('data', function(data) {
				console.log('data'+data );
				//self._sendXplStat(body, 'ipx800.basic');
			});
		
			client.on('error', function(err) {
				console.log('error:', err.message);
			});
			
			client.write(message);
		});
	}
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
