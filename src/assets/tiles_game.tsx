<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.8" tiledversion="1.8.2" name="tiles_game" tilewidth="40" tileheight="40" tilecount="4" columns="2">
 <image source="tile_map.png" width="80" height="80"/>
 <tile id="0" type="box">
  <objectgroup draworder="index" id="2">
   <object id="1" x="-0.164474" y="0.164474" width="39.8026" height="39.4737"/>
  </objectgroup>
 </tile>
 <tile id="2" type="triangleLeft">
  <objectgroup draworder="index" id="3">
   <object id="3" x="0" y="0">
    <polygon points="0,0 40,40 0,40"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="3" type="triangleRight">
  <objectgroup draworder="index" id="2">
   <object id="1" name="triangleRight" x="40" y="0">
    <polygon points="0,0 0,40 -40,40"/>
   </object>
  </objectgroup>
 </tile>
</tileset>
