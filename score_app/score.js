function random(){
	return Math.random()*100;
}

var scenarios = {
	a:{
		events:[
			 {id:'A',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'B',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'C',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'D',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'E',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'F',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'G',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'H',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'I',active_org: true, x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'J',active_org: false,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
			,{id:'K',active_org: false,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: false}
		]
	}
};
	
	
var newproject = function(team,scenario){
	var project = core.projects({});
	project.data({team:team,scenario:scenario}).sync();
	scenarios[scenario].events.forEach(function(d){
		if (d.y_org<50){
			d.active_org = false;
		}
		else {
			d.active_org = true;
		}
		var timestamp = new Date().getTime();
		project.items({_id:d.id+timestamp}).data(d).sync();
	});
	core.project(project.id());
}

var calculatescore = function(id,time){
	if (!time){
		time = new Date().getTime();
	}
	if (core.projects(id)){
		var score = 0;
		var eventfactor = function(d){
			return 5 - (100-d.data('y_org'))/10;
		};
		var deltax = function(d){
			if (d.data('y_org') > 50 && d.data('x') > 0 && d.data('x_org') > 0){
				return 5 - Math.abs((d.data('x')-d.data('x_org'))/20);
			}
			return 0;
		};
		var deltay = function(d){
			//only calculate when an x value is present
			if (d.data('x') > 0 && d.data('x_org') > 0){
				var delta = Math.abs(d.data('y_org') - d.data('y'));
				if (5 - delta/10> 0){ //meaning it is scoring positive
					return 5 - delta/10;
				}
				else {
					return eventfactor(d) - delta/20; 
				}
			}
			return 0;
		};
		var deltafactor = 2;
		var deltacutoff = 40;
		var linkfactor = 1;
		var items = core.projects(id).items().filter(function(d){return !d.deleted()});
		items.forEach(function(d){
			if (d.data(time) && d.data(time).active){
				score = score + eventfactor(d);
	
				//var dx = d.data('x_org') - d.data(time).x;
				//score = score + Math.exp(-Math.PI * Math.pow(dx/deltacutoff,2)) * deltafactor;
				score = score + deltax(d);
				
				//var dy = d.data('y_org') - d.data(time).y;
				//score = score + Math.exp(-Math.PI * Math.pow(dy/deltacutoff,2)) * deltafactor;
				score = score + deltay(d);
				
				if (d.data('link_org') && d.data('link_org') == d.data(time).link){
					score = score + 1*linkfactor;
				}
			}
		});
		return Math.round(score);
	}
	else {
		console.warn('No such project');
		return false;
	}
}