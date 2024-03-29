import Tile from './Tile.js'
/*import Player from './player.js'*/

export default{
    props:['difficulty','displayGrid'],
    components:{
        Tile,
        /*Player*/
    },
    template: `
    <div>
    <div id="grid">
    <Tile 
        v-for="(tile, id) of flatTiles"
        :position="tile"
        :key="'tile'+ id + tile.x + tile.y"
        id="grids"
        @movePlayerOnClick="onMovePlayerOnClick"></Tile>
       <Player class="Player"></Player>
    </div>
    <div id="controlButtons">
    <button @click="moveUp">up</button>
    <button @click="moveDown">down</button>
    <button @click="moveLeft">right</button>
    <button @click="moveRight">left</button>
    </div>
    </div>
    `,
    data(){
        return{
            tiles:[],
            grid: [],
            flatTiles:[],
            wall: "/images/img23.png",
            player: "/images/playerDown.png",
            block: "/images/img2.png",
            ground: "/images/img11.png",
            boxGoal: "/images/img20.png",
            renderMap: 0,
            actualTile: '',
            pastTile: '',
            cloudTile: '',
            moves: 0,
            map1: [
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'G','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'G','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'B', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'F', 'B','W'],
                ['W','G', 'P', 'G', 'G','G', 'G', 'G', 'B','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'B','W'],
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W']
            ],
            map2: [
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W'],
                ['W','G', 'G', 'G', 'W','W', 'G', 'G', 'G','W'],
                ['W','G', 'G', 'B', 'W','W', 'G', 'G', 'G','W'],
                ['W','G', 'G', 'B', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'P', 'G','G', 'G', 'F', 'G','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'F', 'B','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'B','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'B','W'],
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W']
            ],
            map3: [
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W','W','W','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','F','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','F','W'],
                ['W','G', 'B', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'W', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','G', 'G', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','P', 'G', 'G', 'G','G', 'G', 'G', 'G','G','G','G','W'],
                ['W','W', 'W', 'W', 'W','W', 'W', 'W', 'W','W','W','W','W'],
            ], /* Tänker att vi gör map4(Extreme) tillsammans då den skall  vi maxa på, blir avslutnings område */
            playerPosition:{
                x: 1,
                y: 2
            }
        }
    },
    methods:{ /* Detta är logiken i spelet */
        onMovePlayerOnClick(x,y){
            this.actualTile = this.tiles[y][x].img
            /*if(this.tiles[y][x].img == this.boxGoal){
                this.cloudTile = this.boxGoal
                console.log(this.cloudTile)
            } För framtida finish */
            this.cloudTile = this.tiles[y][x].img
            if(this.actualTile != this.wall){
                if(this.player == this.tiles[y-1][x].img ||
                    this.player == this.tiles[y+1][x].img ||
                    this.player == this.tiles[y][x-1].img ||
                    this.player == this.tiles[y][x+1].img){ /* Logic start here */
                        
                if(this.tiles[y-1][x].img == this.player) { /* Denna if är till för sätta tile rätt och undvika dupe player */
                    if(this.tiles[y][x].img == this.block && this.tiles[y+1][x].img != this.wall){
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y-1][x].img = this.ground
                        this.tiles[y+1][x].img = this.block
                    }
                    else{
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y-1][x].img = this.ground
                    }
                        console.log(this.pastTile)
                }
               else if(this.tiles[y+1][x].img == this.player) {
                if(this.tiles[y][x].img == this.block && this.tiles[y-1][x].img != this.wall){
                    this.pastTile = this.tiles[y-1][x].img
                    this.tiles[y+1][x].img = this.ground
                    this.tiles[y-1][x].img = this.block
                }
                else{
                    this.pastTile = this.tiles[y-1][x].img
                    this.tiles[y+1][x].img = this.ground
                }
                    console.log(this.pastTile)
                }
                else if(this.tiles[y][x-1].img == this.player) {
                    if(this.tiles[y][x].img == this.block && this.tiles[y][x+1].img != this.wall){
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y][x-1].img = this.ground
                        this.tiles[y][x+1].img = this.block
                    }
                    else{
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y][x-1].img = this.ground
                    }
                    console.log(this.pastTile)
                }
                else if(this.tiles[y][x+1].img == this.player) {
                    if(this.tiles[y][x].img == this.block && this.tiles[y+1][x].img != this.wall){
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y-1][x].img = this.ground
                        this.tiles[y+1][x].img = this.block
                    }
                    else{
                        this.pastTile = this.tiles[y-1][x].img
                        this.tiles[y][x+1].img = this.ground
                    }
                    console.log(this.pastTile)
                }
                this.tiles[y][x].img = this.player
            }
            else{
                alert('You can only go 1 tile (for now)')
            }
        }
            else{
                alert('You cant go there')
            }
            this.moves++
            console.log(this.tiles[y][x])
            this.flatTiles = this.tiles.flat()
        },
        moveUp(){
            this.playerPosition.y=(this.playerPosition.y)-1;
            console.log(this.playerPosition.x)
            console.log(this.playerPosition.y)
            this.onMovePlayerOnClick(this.playerPosition.x,this.playerPosition.y)
            
        },
        moveDown(){
            this.playerPosition.y=(this.playerPosition.y)+1;
            console.log(this.playerPosition)
            this.onMovePlayerOnClick(this.playerPosition.x,this.playerPosition.y)
        },
        moveRight(){
            this.playerPosition.x=(this.playerPosition.x)-1;
            console.log(this.playerPosition)
            this.onMovePlayerOnClick(this.playerPosition.x,this.playerPosition.y)
        },
        moveLeft(){
            this.playerPosition.x=(this.playerPosition.x)+1;
            console.log(this.playerPosition)
            this.onMovePlayerOnClick(this.playerPosition.x,this.playerPosition.y)
        },
        

    },
    created(){
        if(this.displayGrid = true){
            if(this.difficulty == "Easy"){
                this.playerPosition.x=2
                this.playerPosition.y=7
                let size = 10
                for(let col = 0; col < size; col++){
                    this.tiles[col] = []
                    for(let row = 0; row < size; row++){
                        let position = {
                            x: row,
                            y: col,
                        }
                        this.tiles[col].push(position)
                            switch(this.map1[col][row]){
                                case 'W':{
                                    this.tiles[col][row].img = this.wall
                                    console.log('W')
                                    break
                                }
                                case 'P':{
                                    this.tiles[col][row].img = this.player
                                    console.log('P')
                                    break
                                }
                                case 'B':{
                                    this.tiles[col][row].img = this.block
                                    console.log('B')
                                    break
                                }
                                case 'G':{
                                    this.tiles[col][row].img = this.ground
                                    console.log('G')
                                    break
                                }
                                case 'F':{
                                    this.tiles[col][row].img = this.boxGoal
                                    console.log('F')
                                    break
                                }
                            
                    }
                    
                    
    }
    
}

            }
            else if(this.difficulty == "Normal"){
                this.playerPosition.x=2
                this.playerPosition.y=7
                let size = 10
                for(let col = 0; col < size; col++){
                    this.tiles[col] = []
                    for(let row = 0; row < size; row++){
                        let position = {
                            x: row,
                            y: col,
                        }
                        this.tiles[col].push(position)
                            switch(this.map2[col][row]){
                                case 'W':{
                                    this.wall = "images/img24.png"
                                    this.tiles[col][row].img = this.wall
                                    this.wall = "images/img23.png"
                                    console.log('W')
                                    break
                                }
                                case 'P':{
                                    this.tiles[col][row].img = this.player
                                    console.log('P')
                                    break
                                }
                                case 'B':{
                                    this.tiles[col][row].img = this.block
                                    console.log('B')
                                    break
                                }
                                case 'G':{
                                    this.ground = "images/img19.png"
                                    this.tiles[col][row].img = this.ground
                                    this.ground = "images/img11.png"
                                    console.log('G')
                                    break
                                }
                                case 'F':{
                                    this.tiles[col][row].img = this.boxGoal
                                    console.log('F')
                                    break
                                }
                            
                    }
                    
                    
    }
    
}
            }
            else if(this.difficulty == "Hard"){
                let size = 13
                for(let col = 0; col < size; col++){
                    this.tiles[col] = []
                    for(let row = 0; row < size; row++){
                        let position = {
                            x: row,
                            y: col,
                        }
                        this.tiles[col].push(position)
                            switch(this.map3[col][row]){
                                case 'W':{
                                    this.tiles[col][row].img = this.wall
                                    console.log('W')
                                    break
                                }
                                case 'P':{
                                    this.tiles[col][row].img = this.player
                                    console.log('P')
                                    break
                                }
                                case 'B':{
                                    this.tiles[col][row].img = this.block
                                    console.log('B')
                                    break
                                }
                                case 'G':{
                                    this.tiles[col][row].img = this.ground
                                    console.log('G')
                                    break
                                }
                                case 'F':{
                                    this.tiles[col][row].img = this.boxGoal
                                    console.log('F')
                                    break
                                }
                            
                    }
                    
                    
    }
    
}
            }
            }
            this.flatTiles = this.tiles.flat()
},
    computed:{
        flatTiles(){
            return this.tiles.flat()
        }
    },
    watch:{
        renderMap(val){
            console.log(`Number of moves: ${val}`)
          /*  localStorage.setItem('counter-value', this.renderMap)
            localStorage.setItem('savedMap',JSON.stringify(this.tiles)) */
        },
    }
}