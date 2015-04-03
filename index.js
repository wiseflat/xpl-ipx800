var xplipx800 = require("./lib/xpl-ipx800");
var schema_ipx800basic = require('/etc/wiseflat/schemas/ipx800.basic.json');
var schema_ipx800config = require('/etc/wiseflat/schemas/ipx800.config.json');

var wt = new xplipx800(null, {
	xplLog: false,
	forceBodySchemaValidation: false
});

wt._init(function(error, xpl) {

	if (error) {
		console.error(error);
		return;
	}
        
	xpl.addBodySchema(schema_ipx800basic.id, schema_ipx800basic.definitions.body);
	xpl.addBodySchema(schema_ipx800config.id, schema_ipx800config.definitions.body);

	// Load config file into hash
        wt.readConfig();
        setInterval(function(){
		wt.sendConfig();
        }, 60 * 1000);
	
        xpl.on("xpl:ipx800.basic", function(evt) {
		//console.log("Receive message ipx800.basic ", evt);
                if(evt.headerName == 'xpl-cmnd') {
			wt.sendM2M(evt.body);
                }
        }); 
        
        xpl.on("xpl:ipx800.config", function(evt) {
		//console.log("Receive message ipx800.config ", evt);
                if(evt.headerName == 'xpl-cmnd') wt.writeConfig(evt.body);
        }); 
});

