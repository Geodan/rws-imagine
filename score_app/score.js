function random(){
	return Math.random()*95;
}

var scenarios = {
	a:{
		events:[
			 {id:'A',active_org: true,x_org: random(),y_org: random(),link_org: 'B',x: null,y: null,link: null,active: null}
			,{id:'B',active_org: true,x_org: random(),y_org: random(),link_org: 'C',x: null,y: null,link: null,active: null}
			,{id:'C',active_org: true,x_org: random(),y_org: random(),link_org: 'D',x: null,y: null,link: null,active: null}
			,{id:'D',active_org: true,x_org: random(),y_org: random(),link_org: 'E',x: null,y: null,link: null,active: null}
			,{id:'E',active_org: true,x_org: random(),y_org: random(),link_org: 'F',x: null,y: null,link: null,active: null}
			,{id:'F',active_org: true,x_org: random(),y_org: random(),link_org: 'G',x: null,y: null,link: null,active: null}
			,{id:'G',active_org: true,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: null}
			,{id:'H',active_org: true,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: null}
			,{id:'I',active_org: true,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: null}
			,{id:'J',active_org: false,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: null}
			,{id:'K',active_org: false,x_org: random(),y_org: random(),link_org: null,x: null,y: null,link: null,active: null}
		]
	}
};
	
	
var newproject = function(team,scenario){
	var project = core.projects({});
	project.data({team:team,scenario:scenario}).sync();
	scenarios[scenario].events.forEach(function(d){
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
		var eventfactor = 1;
		var deltafactor = 2;
		var deltacutoff = 40;
		var linkfactor = 1;
		var items = core.projects(id).items().filter(function(d){return !d.deleted()});
		items.forEach(function(d){
			if (d.data('active_org') && d.data(time).active){
				score = score + 1*eventfactor;
	
				var dx = d.data('x_org') - d.data(time).x;
				score = score + Math.exp(-Math.PI * Math.pow(dx/deltacutoff,2)) * deltafactor;
				
				var dy = d.data('y_org') - d.data(time).y;
				score = score + Math.exp(-Math.PI * Math.pow(dy/deltacutoff,2)) * deltafactor;
				
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