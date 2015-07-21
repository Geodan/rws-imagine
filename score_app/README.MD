Initialisatie project
- laden events, incl. default waarden
bijv.:
```
item.data({
	name: 'A',
	active_org: false,
	x_org: 203,
	y_org: 23,
	link_org: 'B',
	x: null, 
	y: null,
	link: null,
	active: null
}).sync();
```

Waarden opslaan
- event wordt toegevoegd:
```
	item.data('active' ,true).sync();
```
-event wordt verplaatst:
```
	item
		.data('x',valx)
		.data('y',valy)
		.sync();
```

-event wordt gelinkt:
```
	item
		.data('link','B')
		.sync();
```

*Berekenen score*
Voor alle events:
	var score = 0;
	var eventfactor = 1;
	var deltafactor = 0.5;
	var deltacutoff = 5;
	var linkfactor = 1;
	items.forEach(function(d){
		if (d.active_org && d.active){
			score = score + 1*eventfactor;

			var dx = d.x_org - d.x;
			score = score + Math.exp(-Math.Pi * Math.pow(dx/deltacutoff,2)) * deltafactor;
			
			if (d.link_org && d.link_org == d.link){
				score = score + 1*linkfactor;
			}
			
		}
	});