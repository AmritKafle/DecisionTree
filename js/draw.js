var drawTree =
{
	data:[],
	spaceY:120,
	spaceX:30,
	width:60,
	height:30,
	
	
	draw: function(data)
	{
		context = document.getElementById("myCanvas").getContext("2d");
		this.data = data;
		fromId = 0;
		
		maxId = this.getMaxId(data);
		
		rootNode = this.find(data,[["","",-1]]);
		
		
		drawY = 200;
		
		if(rootNode[0][0] == 'n')
		{
		
			context.fillStyle="#FFAFA0";
			context.fillRect((400-this.width/2),(drawY-this.height-this.spaceY),this.width,this.height);
		
			context.fillStyle="#000";
			context.fillText(rootNode[0][1],(400-this.width/2),(drawY-this.height-this.spaceY)+15);
		}else
		{
			context.fillStyle="#00A0AF";
			context.fillRect((400-this.width/2),(drawY-this.height-this.spaceY),this.width,this.height);
			
			//Fill Text
			context.fillStyle="#000";
			context.fillText(rootNode[0][1],(400-this.width/2),(drawY-this.height-this.spaceY)+15);
			
			context.fillStyle="#AA9090";
			context.moveTo((400-this.width/2)+(this.width/2),((drawY-this.height-this.spaceY)+this.height));
			context.lineTo((400-this.width/2)+(this.width/2),((drawY-this.height-this.spaceY)+this.height)+50);
			context.stroke();
			
			//fill Label
			context.fillStyle="#000";
			context.fillText(rootNode[0][4],(400-this.width/2)+(this.width/2)-7,((drawY-this.height-this.spaceY)+this.height)+60);
		}
		
		canvasWidth = $("#myCanvas").attr("width");
		
		drawableList = [rootNode];
		
		while(this.find(data,drawableList[drawableList.length-1]).length!=0)
		{
			parents = drawableList[drawableList.length-1];
			nodes = this.find(data,parents);
			
			n = nodes.length;
			
			startX = 400 - (n*this.width + (n-1)*this.spaceX)/2;
			
			
			for(i=0;i<nodes.length;i++)
			{
				if(nodes[i][0] == 'n')
				{
					context.fillStyle="#FFAFA0";
					context.fillRect(startX,drawY,this.width,this.height);
					
					//Fill Text
					context.fillStyle="#000";
					context.fillText(nodes[i][1],startX,drawY+15);
					
				}else
				{
					context.fillStyle="#00A0AF";
					context.fillRect(startX,drawY,this.width,this.height);
					
					//Fill Text
					context.fillStyle="#000";
					context.fillText(nodes[i][1],startX,drawY+15);
					
					context.fillStyle="#AA9090";
					context.moveTo(startX+(this.width/2),(drawY+this.height));
					context.lineTo(startX+(this.width/2),(drawY+this.height)+50);
					context.stroke();
					
					//fill Label
					context.fillStyle="#000";
					context.fillText(nodes[i][4],startX+(this.width/2)-7,(drawY+this.height)+60);
					
				}
				
				this.drawLineToParent(context,parents,nodes[i],i,startX,drawY);
				startX += (this.width + this.spaceX);
			}
			
			
			drawY += (this.height + this.spaceY);
			
			drawableList.push(nodes);
			
		}
	},
	
	drawLineToParent: function(c,parents,node,index,x,y)
	{
		
		
		pid = 0;
		for(pos=0;pos<parents.length;pos++)
		{
			if(parents[pos][2] == node[3])
				pid = pos;	
		}
		
		n  = parents.length;
		
		stX = 400 - (n*this.width + (n-1)*this.spaceX)/2;
		pX = stX + (pid)*(this.width+this.spaceX) + (this.width/2);
		pY = drawY - (this.height + this.spaceY);
		
		c.fillStyle="#000";
		
		c.moveTo(pX,pY+this.height);
		c.lineTo(x+(this.width/2),y);
		c.stroke();
		
	},
	
	getMaxId: function(data)
	{
		maxId = 0;
		for(i=0;i<data.length;i++)
		{
			if(data[i][2] > maxId)
				maxId = data[i][2];
		}
		
		return maxId;
	},
	
	drawNode: function(node,fromId)
	{
		console.log(node[0]+" "+fromId+" "+node[1]);
	},
	
	drawLabel: function(node,fromId)
	{
		console.log(node[0]+" "+fromId+" "+node[1]);
	},
	
	
	find: function(data,list)
	{
		found = [];
		
		for(j=0;j<list.length;j++)
		{
			from = list[j][2];
			for(i=0;i<data.length;i++)
			{
				if(data[i][3] == from)
					found.push(data[i]);
			}
		}
		
		return found;
	},
};
