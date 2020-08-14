var websocket;
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    start(){
        this.label.string = this.text;
        this.initSocket();
    },

    // use this for initialization
    onLoad: function () {
        /*cc.log('before send ');
        websocket.send('hello');
        cc.log('after send ');*/

    },

    // called every frame
    update: function (dt) {

    },

        //���ӷ�����

    initSocket: function(){

        if(window.WebSocket){
            var wsUri = "ws://localhost:8080/tomcat_websocket/test";
            websocket = new WebSocket(wsUri);
            //websocket.binaryType = "arraybuffer";

            //var mythis = this;

            //���ӵ���������ִ��
            websocket.onopen = function(event) {
                console.log("connect");
                websocket.send('hello');
                //mythis.requestInitInfoBar();
            };

            //�Ͽ����������Ӻ�ִ��
            websocket.onclose = function(event) {
                console.log("closed");
            };

            //���շ��������ݵ���Ϣ��ִ��
            websocket.onmessage = function(event) {
                cc.log(event.data);
                //mythis.processData(json);
            };
            //����ʱִ��
            websocket.onerror = function(event) {
                console.log("error");
            };
        }
        else{
            alert("�������֧��WebSocket��");
        }
    }
});
