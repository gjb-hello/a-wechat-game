// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        console.log("onLoad");
        this.player_now = this.node.getChildByName('player_now');
        //��ȡplayer_now�ڵ�
        //console.log(this.player_now)
        this.loadMap();
        //���ص�ͼ

        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //�����¼�
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        //����¼�
    },


    tryMoveToNewTile: function (newTile) {
        var mapSize = this.tiledMap.getMapSize();

        //�����߽磬ֱ�ӷ���
        if (newTile.x < 0 || newTile.x >= mapSize.width-1) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height-1) return;

        //console.log(this.ground.getTileGIDAt(newTile))
        //1������,2�Ƿ�����
        //this.ground.setTileGIDAt(1,newTile.x,newTile.y)


        //
        //if()
        //this.tryenclouse(newTile);//����Ȧ��
        this.playerTile = newTile;
        this.updatePlayerPos();
    },

    //����¼�
    onMouseDown: function (event) {
        var click_pos = event.getLocation();
        var click_posTile = this.getTilePos(click_pos);
        var newTile = cc.v2(this.playerTile.x, this.playerTile.y);
        if (click_posTile.x > newTile.x) { newTile.x += 1; console.log("right"); }
        else if (click_posTile.x < newTile.x) { newTile.x -= 1; console.log("left"); }
        else if (click_posTile.y > newTile.y) { newTile.y += 1; console.log("up"); }
        else if (click_posTile.y < newTile.y) { newTile.y -= 1; console.log("down"); }
        this.tryMoveToNewTile(newTile);
    },


    //���ص�ͼ�ļ�ʱ����
    loadMap: function () {
        console.log("loadmap");
        //��ʼ����ͼλ��
        this.node.setPosition(cc.visibleRect.bottomLeft);

        //��ͼ
        this.tiledMap = this.node.getComponent(cc.TiledMap);

        //player�����
        var player = this.tiledMap.getObjectGroup('player');

        var birth_point_1 = player.getObject('birth_point_1');

        console.log("1");
        //��������
        var startPos = cc.v2(birth_point_1.x, birth_point_1.y);
        console.log("startPos"+startPos);

        this.ground = this.tiledMap.getLayer('ground');

        //����Tile
        this.playerTile = this.getTilePos(startPos);
        console.log("start tile"+this.playerTile)
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
        //var pos = this.barriers.getPositionAt(this.playerTile);
        var pos = this.ground.getPositionAt(this.playerTile);
        this.ground.setTileGIDAt(1, this.playerTile.x, this.playerTile.y)
        //����߹���·��
        this.player_now.setPosition(pos);
        //console.log(this.player_now.x);
    },
    // update (dt) {},
});
