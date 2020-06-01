cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        console.log("onLoad");
        this.player = this.node.getChildByName('player');
        //��ȡplayer�ڵ�

        this.loadMap();
        //���ص�ͼ

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        //�������¼�
    },

    onKeyDown: function (event) {       
        //��ȡplayer����Ƭ����
        var newTile = cc.v2(this.playerTile.x, this.playerTile.y);

        switch (event.keyCode) {
            case cc.macro.KEY.up:
                newTile.y -= 1;
                break;
            case cc.macro.KEY.down:
                newTile.y += 1;
                break;
            case cc.macro.KEY.left:
                newTile.x -= 1;
                break;
            case cc.macro.KEY.right:
                newTile.x += 1;
                break;
            default:
                return;
        }

        //�����ƶ����µ���Ƭ��
        this.tryMoveToNewTile(newTile);
    },

    onMouseDown: function(event) {
        var click_pos = event.getLocation();
        var click_posTile = this.getTilePos(click_pos);
        var newTile = cc.v2(this.playerTile.x, this.playerTile.y);
        //console.log("click_pos.x" + click_posTile.x + "  playerTile.x" + newTile.x);
        if (click_posTile.x > newTile.x) { newTile.x += 1; console.log("right"); }
        else if (click_posTile.x < newTile.x) { newTile.x -= 1; console.log("left"); }
        else if (click_posTile.y > newTile.y) { newTile.y += 1; console.log("up"); }
        else if (click_posTile.y < newTile.y) {newTile.y -= 1; console.log("down");}
        this.tryMoveToNewTile(newTile);
    },

    tryMoveToNewTile: function (newTile) {
        var mapSize = this.tiledMap.getMapSize();

        //�����߽磬ֱ�ӷ���
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        //�����ϰ�
        if (this.barriers.getTileGIDAt(newTile)) {
            //GID=0,���TileΪ��
            //�ϰ���GID 19
            //console.log(this.barriers.getTileGIDAt(newTile));
            console.log('This way is blocked!');
            //this.barriers.setTileGIDAt(19, newTile.x, newTile.y);
            return false;
        }

        this.tryCatchStar(newTile);
        this.playerTile = newTile;
        this.updatePlayerPos();
        if (cc.Vec2(this.playerTile, this.endTile)==0) {
            console.log('succeed');
        }
    },

    tryCatchStar: function (newTile) {
        //console.log(this);
        var GID = this.stars.getTileGIDAt(newTile);
        var prop = this.tiledMap.getPropertiesForGID(GID);
        var bar = this.tiledMap.getLayer('barriers');
        //bar.setTileGIDAt(19, newTile.x, newTile.y)
        if (this.stars.getTileGIDAt(newTile)) {//GID=0,���TileΪ��
            console.log('starGID', this.stars.getTileGIDAt(newTile))
            //this.stars.getTiledTileAt(newTile.x, newTile.y, true)
            this.stars.setTileGIDAt(0, newTile.x, newTile.y)
            //this.stars.setTileGIDAt(39, newTile.x, newTile.y)
            console.log('removeTileAt: ', newTile)
        }
    },

    //���ص�ͼ�ļ�ʱ����
    loadMap: function () {
        console.log("loadmap");
        //��ʼ����ͼλ��
        this.node.setPosition(cc.visibleRect.bottomLeft);

        //��ͼ
        this.tiledMap = this.node.getComponent(cc.TiledMap);

        //players�����
        var players = this.tiledMap.getObjectGroup('players');

        //startPoint��endPoint����
        var startPoint = players.getObject('startPoint');
        var endPoint = players.getObject('endPoint');

        console.log("1");
        //��������
        var startPos = cc.v2(startPoint.x, startPoint.y);
        var endPos = cc.v2(endPoint.x, endPoint.y);
        console.log("successful get index");

        //�ϰ���ͼ�������ͼ��
        this.barriers = this.tiledMap.getLayer('barriers');
        this.stars = this.tiledMap.getLayer('stars');

        //����Tile�ͽ���Tile
        this.playerTile = this.startTile = this.getTilePos(startPos);
        this.endTile = this.getTilePos(endPos);
        //����playerλ��
        this.updatePlayerPos();
    },

    //����������ת��Ϊ��Ƭ����
    getTilePos: function (posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.v2(x, y);
    },


    updatePlayerPos: function () {
        var pos = this.barriers.getPositionAt(this.playerTile);
        this.player.setPosition(pos);
    },

});
