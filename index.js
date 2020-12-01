var container = document.getElementById("container"),
	Map = document.getElementById("Map"),
	lis = Map.getElementsByTagName("li"),
	person = document.getElementById("person"),
	snakes = person.getElementsByTagName("div"),
	start = document.getElementById("start"),
	restart = document.getElementById("restart"),
	suspend = document.getElementById("suspend"),
	integral = document.getElementById("integral"),
	timer = null,
	food = null,
	num  = 0,
	data = {size:20,x:10,y:10},
	dataCode = {speed:180,code:39};
	


function init(){
	createMap();
	createPerson();
	playGame();
	Gogame();
	suspendGame();
	restartGame();
	start.index = 0;
}


function createMap(){		//创建地图
	for(var i=0;i<(data.x*data.y);i++){
		var li = document.createElement("li");
		li.style.width = li.style.height = data.size+"px";
		li.index = i;
		Map.appendChild(li);
	}
	container.style.width = (data.size+1)*data.x+"px";
	container.style.height = (data.size+1)*data.y+"px";
}

function createPerson(){		//创建蛇头
	var snake = document.createElement("div");
	snake.className = "snakeTop";
	snake.style.width = snake.style.height = data.size+"px";
	snake.index = 0;
	person.appendChild(snake);
	suspend.index = 0;
}

function createFood(){		//随机创建食物
	var arr = [];
	for(var i=0;i<lis.length;i++){
		if(isFilter(lis[i])){
			arr.push(lis[i]);
		}
	}
	var rdm = Math.floor(Math.random()*arr.length-1);
	var food = document.createElement("div");
	food.className = "food";
	food.style.width = food.style.height = data.size+"px";
	food.style.top = arr[rdm].offsetTop+"px";
	food.style.left = arr[rdm].offsetLeft+"px";
	container.appendChild(food);
}

function setTimer(){		//定时器
	timer = setInterval(moveSnake,dataCode.speed);
}

function moveSnake(){
	if(isOut() || isMy()){
		alert("菜逼还玩呢，你配吗？");
		clearInterval(timer);
	}
	food = document.getElementsByClassName("food")[0];
	if(pz(snakes[0],food)){		//判断是否吃到食物，吃到添加到蛇的容器里面
		food.className = "snakeBody";
		num += 10;
		integral.innerHTML = "积分："+num;
		person.appendChild(food);
		createFood();
	}
	for(var i=snakes.length-1;i>0;i--){
		snakes[i].style.left = snakes[i-1].offsetLeft+"px";
		snakes[i].style.top = snakes[i-1].offsetTop+"px";
		snakes[i].index = snakes[i-1].index;
	}
	switch(dataCode.code){
		case 37:
		snakes[0].style.left = snakes[0].offsetLeft-(data.size+1)+"px";
		snakes[0].index -= 1;
		break;
		case 38:
		snakes[0].style.top = snakes[0].offsetTop-(data.size+1)+"px";
		snakes[0].index -= data.x;
		break;
		case 39:
		snakes[0].style.left = snakes[0].offsetLeft+(data.size+1)+"px";
		snakes[0].index += 1;
		break;
		case 40:
		snakes[0].style.top = snakes[0].offsetTop+(data.size+1)+"px";
		snakes[0].index += data.x;
		break;
	}
}

function isOut(){		//判断是否出界
	for(var i=0;i<lis.length;i++){
		if(pz(lis[i],snakes[0])){
			return false;
		}
	}
	return true;
}
function isMy(){		//判断是否撞到自身
	for(var i=1;i<snakes.length;i++){
		if(pz(snakes[0],snakes[i])){
			return true;
		}
	}
	return false;
}

function isFilter(li){
	for(var i=0;i<snakes.length;i++){
		if(snakes[i].index == li.index){
			return false;
		}
	}
	return true;
}

function changeCode(){		//改变方向
	document.onkeydown = function(e){
		var e = window.event || e;
		switch (e.keyCode){
			case 37:
			if(dataCode.code!=39){
				dataCode.code = 37;
			}
			break;
			case 38:
			if(dataCode.code!=40){
				dataCode.code = 38;
			}
			break;
			case 39:
			if(dataCode.code!=37){
				dataCode.code = 39;
			}
			break;
			case 40:
			if(dataCode.code!=38){
				dataCode.code = 40;
			}
			break;
		}
	}
}

function pz(el1,el2){		//碰撞函数
	var t1 = el1.offsetTop+el1.offsetHeight,
		r1 = el1.offsetLeft,
		b1 = el1.offsetTop,
		l1 = el1.offsetLeft+el1.offsetWidth;
		
	var t2 = el2.offsetTop+el2.offsetHeight,
		r2 = el2.offsetLeft,
		b2 = el2.offsetTop,
		l2 = el2.offsetLeft+el2.offsetWidth;
	
	if(t1<=b2 || r1>=l2 || b1>=t2 || l1<=r2){
		return false;
	}
	return true;
}

function Gogame(){		//按下空格开始游戏
	window.onkeydown = function(e){
		var e = window.event || e;
		switch(e.keyCode){
			case 13:
			if(start.index != 1 ){
				start.onclick();
				start.index = 1;
			}
			break;
			case 27:
			restart.click();
			break;
			case 32:
			if(timer != null){
				suspend.click();
			}
			break;
		}
	}
}

function suspendGame(){
	suspend.onclick = function(){
		if(suspend.index==0){
			suspend.index=1;
			clearInterval(timer);
		}else if(suspend.index=1){
			timer = setInterval(moveSnake,dataCode.speed);
			suspend.index = 0;
		}
	}
}

function restartGame(){
	restart.onclick = function(){
		location.reload();
	}
}

function playGame(){
	start.onclick = function(){
		changeCode();
		setTimer();
		createFood();
	}
}

init();