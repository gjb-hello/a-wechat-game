cc.Class({
    extends: cc.Component,

    properties: {
        // ���Ǻ�����֮��ľ���С�������ֵʱ���ͻ�����ռ�
        pickRadius: 0
    },

    
    getPlayerDistance: function () {

 
        // ���� player �ڵ�λ���жϾ���
        var playerPos = this.game.player.getPosition();

        // ��������λ�ü�������֮�����
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function () {
        // �����Ǳ��ռ�ʱ������ Game �ű��еĽӿڣ�����һ���µ�����
        this.game.spawnNewStar();

        // ���� Game �ű��ĵ÷ַ���
        this.game.gainScore();

        // Ȼ�����ٵ�ǰ���ǽڵ�
        this.node.destroy();
    },

    update: function (dt) {
        // ÿ֡�жϺ�����֮��ľ����Ƿ�С���ռ�����
        if (this.getPlayerDistance() < this.pickRadius) {
            // �����ռ���Ϊ
            this.onPicked();
            return;
        }
        // ���� Game �ű��еļ�ʱ���������ǵ�͸����
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 100;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
    
});
