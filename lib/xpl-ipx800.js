var Xpl = require('xpl-api');
var fs = require('fs');
var os = require('os');
var http = require('http');

function wt(device, options) {
	options = options || {};
	this._options = options;
	
        this.configFile = "/etc/wiseflat/ipx800.config.json";
        this.configHash = [];
	
	this.server = [];
	this.config = 0;
	
	options.xplSource = options.xplSource || "bnz-ipx800."+os.hostname();

	this.xpl = new Xpl(options);
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
        },   
        
        _sendXplTrig: function(h, m, status, info){
                var self = this;
                self.xpl.sendXplTrig({
                        type:       'suncalc',
                        status:     status,
                        time:       h+':'+m,
                        info:       info
                }, 'ipx800.basic');
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
                self.configHash.login = body.login;
		self.configHash.password = body.password;
                fs.writeFile(self.configFile, JSON.stringify(self.configHash), function(err) {
                        if (err) console.log("file "+self.configFile+" was not saved to disk ...");
                });
        },

        
        /*setServerConfig: function(body){
            var self = this;
            self.server = {
                    host:       body.host,
                    port:       body.port,
                    path:       '/preset.htm?',
                    headers: {
                            'Authorization': 'Basic ' + new Buffer(body.login + ':' + body.password).toString('base64')
                          }
             };
             self.config=1;
        },*/
        
        sendCommand: function(device, command, callback){
                var self = this;
		
		var server = {
			host:       self.configHash.host,
			port:       self.configHash.port,
			path:       '/preset.htm?'+device+"="+command,
			headers: {
				'Authorization': 'Basic ' + new Buffer(self.configHash.login + ':' + self.configHash.password).toString('base64')
			}
		 };

                //self.server.path = self.server.path+device+"="+action;
                
                //if(self.config){
                        return http.get(server, function(res) {
                            // Continuously update stream with data
                                var body = "";
                                res.on('data', function(data) {
                                    body += data;
                                });
                                res.on('end', function() {
                                    console.log(body);
                                })
                                res.on('error', function(e) {
                                    console.log("Got error: " + e.message);
                                });
                        });
                /*}
                else {
                    self.sendNoConfig();
                }*/
                
        },    
        
        /*getLocalConfig: function(){
                var self = this;
                fs.readFile(self.configFile, { encoding: "utf-8"}, function (err, body) {
                        if (err) {
                                self.sendNoConfig();
                        }
                        else {
                                self.setServerConfig(JSON.parse(body));
                                self.sendConfig(JSON.parse(body));
                        }
                });
        },*/
          
        /*sendConfig: function(body) {
                var self = this;                
                self.xpl.sendXplStat({
                        host:       body.host,
                        port:       body.port,
                        username:   body.username,
                        password:   body.password
                }, 'ipx800.config');
        },
        
        sendNoConfig: function() {
                var self = this;
                self.xpl.sendXplStat({
                        host:       '',
                        port:       '',
                        username:   '',
                        password:   ''
                }, 'ipx800.config');
        }*/
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
