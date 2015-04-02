var xplipx800 = require("./lib/xpl-ipx800");
var schema_ipx800basic = require('/etc/wiseflat/schemas/ipx800.basic.json');
var schema_ipx800config = require('/etc/wiseflat/schemas/ipx800.config.json');

var wt = new xplipx800(null, {
	//xplSource: 'bnz-ipx800.wiseflat'
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
	
        //wt.getLocalConfig();
        
        xpl.on("xpl:ipx800.basic", function(evt) {
		console.log("Receive message ipx800.basic ", evt);
                if(evt.headerName == 'xpl-cmnd') {
			if(evt.body.device == 'led0') wt.sendCommand('set1', evt.body.command);
                        if(evt.body.device == 'led1') wt.sendCommand('set2', evt.body.command);
                        if(evt.body.device == 'led2') wt.sendCommand('set3', evt.body.command);
                        if(evt.body.device == 'led3') wt.sendCommand('set4', evt.body.command);
                        if(evt.body.device == 'led4') wt.sendCommand('set5', evt.body.command);
                        if(evt.body.device == 'led5') wt.sendCommand('set6', evt.body.command);
                        if(evt.body.device == 'led6') wt.sendCommand('set7', evt.body.command);
                        if(evt.body.device == 'led7') wt.sendCommand('set8', evt.body.command);
                        if(evt.body.device == 'led8') wt.sendCommand('set9', evt.body.command);
                        if(evt.body.device == 'led9') wt.sendCommand('set10', evt.body.command);
                        if(evt.body.device == 'led10') wt.sendCommand('set11', evt.body.command);
                        if(evt.body.device == 'led11') wt.sendCommand('set12', evt.body.command);
                        if(evt.body.device == 'led12') wt.sendCommand('set13', evt.body.command);
                        if(evt.body.device == 'led13') wt.sendCommand('set14', evt.body.command);
                        if(evt.body.device == 'led14') wt.sendCommand('set15', evt.body.command);
                        if(evt.body.device == 'led15') wt.sendCommand('set16', evt.body.command);
                        if(evt.body.device == 'led16') wt.sendCommand('set17', evt.body.command);
                        if(evt.body.device == 'led17') wt.sendCommand('set18', evt.body.command);
                        if(evt.body.device == 'led18') wt.sendCommand('set19', evt.body.command);
                        if(evt.body.device == 'led19') wt.sendCommand('set20', evt.body.command);
                        if(evt.body.device == 'led20') wt.sendCommand('set21', evt.body.command);
                        if(evt.body.device == 'led21') wt.sendCommand('set22', evt.body.command);
                        if(evt.body.device == 'led22') wt.sendCommand('set23', evt.body.command);
                        if(evt.body.device == 'led23') wt.sendCommand('set24', evt.body.command);
                        if(evt.body.device == 'led24') wt.sendCommand('set25', evt.body.command);
                        if(evt.body.device == 'led25') wt.sendCommand('set26', evt.body.command);
                        if(evt.body.device == 'led26') wt.sendCommand('set27', evt.body.command);
                        if(evt.body.device == 'led27') wt.sendCommand('set28', evt.body.command);
                        if(evt.body.device == 'led28') wt.sendCommand('set29', evt.body.command);
                        if(evt.body.device == 'led29') wt.sendCommand('set30', evt.body.command);
                        if(evt.body.device == 'led30') wt.sendCommand('set31', evt.body.command);
                        if(evt.body.device == 'led31') wt.sendCommand('set32', evt.body.command);
			
                        /*if(evt.body.device == 'led0') wt.sendCommand('set1', evt.body.command);
                        if(evt.body.device == 'led1') wt.sendCommand('set2', evt.body.command);
                        if(evt.body.device == 'led2') wt.sendCommand('set3', evt.body.command);
                        if(evt.body.device == 'led3') wt.sendCommand('set4', evt.body.command);
                        if(evt.body.device == 'led4') wt.sendCommand('set5', evt.body.command);
                        if(evt.body.device == 'led5') wt.sendCommand('set6', evt.body.command);
                        if(evt.body.device == 'led6') wt.sendCommand('set7', evt.body.command);
                        if(evt.body.device == 'led7') wt.sendCommand('set8', evt.body.command);
                        if(evt.body.device == 'led8') wt.sendCommand('set9', evt.body.command);
                        if(evt.body.device == 'led9') wt.sendCommand('set10', evt.body.command);
                        if(evt.body.device == 'led10') wt.sendCommand('set11', evt.body.command);
                        if(evt.body.device == 'led11') wt.sendCommand('set12', evt.body.command);
                        if(evt.body.device == 'led12') wt.sendCommand('set13', evt.body.command);
                        if(evt.body.device == 'led13') wt.sendCommand('set14', evt.body.command);
                        if(evt.body.device == 'led14') wt.sendCommand('set15', evt.body.command);
                        if(evt.body.device == 'led15') wt.sendCommand('set16', evt.body.command);
                        if(evt.body.device == 'led16') wt.sendCommand('set17', evt.body.command);
                        if(evt.body.device == 'led17') wt.sendCommand('set18', evt.body.command);
                        if(evt.body.device == 'led18') wt.sendCommand('set19', evt.body.command);
                        if(evt.body.device == 'led19') wt.sendCommand('set20', evt.body.command);
                        if(evt.body.device == 'led20') wt.sendCommand('set21', evt.body.command);
                        if(evt.body.device == 'led21') wt.sendCommand('set22', evt.body.command);
                        if(evt.body.device == 'led22') wt.sendCommand('set23', evt.body.command);
                        if(evt.body.device == 'led23') wt.sendCommand('set24', evt.body.command);
                        if(evt.body.device == 'led24') wt.sendCommand('set25', evt.body.command);
                        if(evt.body.device == 'led25') wt.sendCommand('set26', evt.body.command);
                        if(evt.body.device == 'led26') wt.sendCommand('set27', evt.body.command);
                        if(evt.body.device == 'led27') wt.sendCommand('set28', evt.body.command);
                        if(evt.body.device == 'led28') wt.sendCommand('set29', evt.body.command);
                        if(evt.body.device == 'led29') wt.sendCommand('set30', evt.body.command);
                        if(evt.body.device == 'led30') wt.sendCommand('set31', evt.body.command);
                        if(evt.body.device == 'led31') wt.sendCommand('set32', evt.body.command);*/
                }
        }); 
        
        xpl.on("xpl:ipx800.config", function(evt) {
		console.log("Receive message ipx800.config ", evt);
                if(evt.headerName == 'xpl-cmnd') wt.writeConfig(evt.body);
        }); 

        xpl.on("xpl:ipx800.request", function(evt) {
		console.log("Receive message ipx800.request ", evt);
                if(evt.headerName == 'xpl-cmnd') wt.readConfig();
        });
});

