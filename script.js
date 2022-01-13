<html>
   <head>
      <meta charset='utf-8'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <title>test mobile 2</title>
      <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
      <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
   </head>
   <script src="./script.js"></script>
   <style>
      span {
      margin-right: 0.5em;
      }
      div.debug {
      position: fixed;
      bottom: 20px;
      left: 10px;
      z-index: 1;
      width: 100%;
      background-color: rgba(1, 1, 1, 0.2);
      color: #ff7500;
      font-size: 0.75em;
      padding: 0.5em;
      width: initial;
      }
      #alert-popup {
      border-radius: 5px;
      position: absolute;
      bottom: 10%;
      left: 5%;
      display: block;
      width: 80%;
      margin: 1em;
      padding: 0.25em;
      color: #ff7500;
      font-size: 0.75em;
      text-align: center;
      background-color: white;
      }
      #place-label {
      position: absolute;
      top: 5%;
      left: 0%;
      display: flex;
      justify-content: center;
      width: 100%;
      }
      #place-label > span {
      z-index: 99999;
      padding: 0.25em;
      color: #ff7500;
      text-align: center;
      background-color: white;
      font-size: 1.5em;
      border-radius: 5px;
      }
      .arjs-loader {
      position: fixed;
      z-index: 999;
      overflow: show;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 50px;
      height: 50px;
      pointer-events: none;
      border: 0.4em solid transparent;
      border-color: #eee;
      border-top-color: #444;
      border-radius: 50%;
      animation: loadingspin 1s linear infinite;
      }
      @keyframes loadingspin {
      100% {
      transform: rotate(360deg)
      }
      }
   </style>
   <body style='margin: 0; overflow: hidden;'>
      <a-scene vr-mode-ui="enabled: false" embedded
         arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
         <a-camera gps-camera rotation-reader>
         </a-camera>
      </a-scene>
   </body>
</html>
