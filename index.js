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
	
        //wt.getLocalConfig();
        
        xpl.on("xpl:ipx800.basic", function(evt) {
		console.log("Receive message ipx800.basic ", evt);
                if(evt.headerName == 'xpl-cmnd') {
			wt.sendCommand(evt.body.device, evt.body.command);
			/*if(evt.body.device == 'led0') wt.sendCommand('1', evt.body.command);
                        if(evt.body.device == 'led1') wt.sendCommand('2', evt.body.command);
                        if(evt.body.device == 'led2') wt.sendCommand('3', evt.body.command);
                        if(evt.body.device == 'led3') wt.sendCommand('4', evt.body.command);
                        if(evt.body.device == 'led4') wt.sendCommand('5', evt.body.command);
                        if(evt.body.device == 'led5') wt.sendCommand('6', evt.body.command);
                        if(evt.body.device == 'led6') wt.sendCommand('7', evt.body.command);
                        if(evt.body.device == 'led7') wt.sendCommand('8', evt.body.command);
                        if(evt.body.device == 'led8') wt.sendCommand('9', evt.body.command);
                        if(evt.body.device == 'led9') wt.sendCommand('10', evt.body.command);
                        if(evt.body.device == 'led10') wt.sendCommand('11', evt.body.command);
                        if(evt.body.device == 'led11') wt.sendCommand('12', evt.body.command);
                        if(evt.body.device == 'led12') wt.sendCommand('13', evt.body.command);
                        if(evt.body.device == 'led13') wt.sendCommand('14', evt.body.command);
                        if(evt.body.device == 'led14') wt.sendCommand('15', evt.body.command);
                        if(evt.body.device == 'led15') wt.sendCommand('16', evt.body.command);
                        if(evt.body.device == 'led16') wt.sendCommand('17', evt.body.command);
                        if(evt.body.device == 'led17') wt.sendCommand('18', evt.body.command);
                        if(evt.body.device == 'led18') wt.sendCommand('19', evt.body.command);
                        if(evt.body.device == 'led19') wt.sendCommand('20', evt.body.command);
                        if(evt.body.device == 'led20') wt.sendCommand('21', evt.body.command);
                        if(evt.body.device == 'led21') wt.sendCommand('22', evt.body.command);
                        if(evt.body.device == 'led22') wt.sendCommand('23', evt.body.command);
                        if(evt.body.device == 'led23') wt.sendCommand('24', evt.body.command);
                        if(evt.body.device == 'led24') wt.sendCommand('25', evt.body.command);
                        if(evt.body.device == 'led25') wt.sendCommand('26', evt.body.command);
                        if(evt.body.device == 'led26') wt.sendCommand('27', evt.body.command);
                        if(evt.body.device == 'led27') wt.sendCommand('28', evt.body.command);
                        if(evt.body.device == 'led28') wt.sendCommand('29', evt.body.command);
                        if(evt.body.device == 'led29') wt.sendCommand('30', evt.body.command);
                        if(evt.body.device == 'led30') wt.sendCommand('31', evt.body.command);
                        if(evt.body.device == 'led31') wt.sendCommand('32', evt.body.command);*/
			
                        /*if(evt.body.device == 'led0') wt.sendCommand('1', evt.body.command);
                        if(evt.body.device == 'led1') wt.sendCommand('2', evt.body.command);
                        if(evt.body.device == 'led2') wt.sendCommand('3', evt.body.command);
                        if(evt.body.device == 'led3') wt.sendCommand('4', evt.body.command);
                        if(evt.body.device == 'led4') wt.sendCommand('5', evt.body.command);
                        if(evt.body.device == 'led5') wt.sendCommand('6', evt.body.command);
                        if(evt.body.device == 'led6') wt.sendCommand('7', evt.body.command);
                        if(evt.body.device == 'led7') wt.sendCommand('8', evt.body.command);
                        if(evt.body.device == 'led8') wt.sendCommand('9', evt.body.command);
                        if(evt.body.device == 'led9') wt.sendCommand('10', evt.body.command);
                        if(evt.body.device == 'led10') wt.sendCommand('11', evt.body.command);
                        if(evt.body.device == 'led11') wt.sendCommand('12', evt.body.command);
                        if(evt.body.device == 'led12') wt.sendCommand('13', evt.body.command);
                        if(evt.body.device == 'led13') wt.sendCommand('14', evt.body.command);
                        if(evt.body.device == 'led14') wt.sendCommand('15', evt.body.command);
                        if(evt.body.device == 'led15') wt.sendCommand('16', evt.body.command);
                        if(evt.body.device == 'led16') wt.sendCommand('17', evt.body.command);
                        if(evt.body.device == 'led17') wt.sendCommand('18', evt.body.command);
                        if(evt.body.device == 'led18') wt.sendCommand('19', evt.body.command);
                        if(evt.body.device == 'led19') wt.sendCommand('20', evt.body.command);
                        if(evt.body.device == 'led20') wt.sendCommand('21', evt.body.command);
                        if(evt.body.device == 'led21') wt.sendCommand('22', evt.body.command);
                        if(evt.body.device == 'led22') wt.sendCommand('23', evt.body.command);
                        if(evt.body.device == 'led23') wt.sendCommand('24', evt.body.command);
                        if(evt.body.device == 'led24') wt.sendCommand('25', evt.body.command);
                        if(evt.body.device == 'led25') wt.sendCommand('26', evt.body.command);
                        if(evt.body.device == 'led26') wt.sendCommand('27', evt.body.command);
                        if(evt.body.device == 'led27') wt.sendCommand('28', evt.body.command);
                        if(evt.body.device == 'led28') wt.sendCommand('29', evt.body.command);
                        if(evt.body.device == 'led29') wt.sendCommand('30', evt.body.command);
                        if(evt.body.device == 'led30') wt.sendCommand('31', evt.body.command);
                        if(evt.body.device == 'led31') wt.sendCommand('32', evt.body.command);*/
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

