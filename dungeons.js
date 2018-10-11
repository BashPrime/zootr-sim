var dungeongrid = [
  'Deku Tree', 
  'Dodongos Cavern', 
  'Jabu Jabus Belly', 
  'Forest Temple', 
  'Fire Temple', 
  'Water Temple', 
  'Shadow Temple', 
  'Spirit Temple', 
  'Free',
  'Bottom of the Well', 
  'Ice Cavern', 
  'Gerudo Training Grounds', 
  'Ganons Castle' 
];

var nameToImageTitle = {
  'Deku Tree': 'deku.png',
  'Dodongos Cavern': 'dodongo.png',
  'Jabu Jabus Belly': 'jabu.png',
  'Forest Temple': 'forest.png',
  'Fire Temple': 'fire.png',
  'Water Temple': 'water.png',
  'Shadow Temple': 'shadow.png',
  'Spirit Temple': 'spirit.png',
  'Free': 'free.png',
  'Spirit Temple': 'spirit.png',
  'Bottom of the Well': 'botw.png',
  'Ice Cavern': 'ice.png',
  'Gerudo Training Grounds': 'gtg.png',
  'Ganons Castle': 'gc.png'
}

function getMedallionImage(dungeon) {
  if (dungeon in knownMedallions) {
    med = knownMedallions[dungeon];
    var medToImage = {
      'Kokiri Emerald': 'stones.png',
      'Goron Ruby': 'stones.png',
      'Zora Sapphire': 'stones.png',
      'Forest Medallion': 'forest-small.png',
      'Fire Medallion': 'firewater.png',
      'Water Medallion': 'firewater.png',
      'Shadow Medallion': 'shadowspirit.png',
      'Spirit Medallion': 'shadowspirit.png',
      'Light Medallion': 'light-small.png',
      '???': 'unknown-small.png' 
    };
    return medToImage[med];
  }
  else {
    return '';
  }
}

function hasKeys(dungeon) {
  return dungeon in {
    'Forest Temple':0,
    'Fire Temple':0,
    'Water Temple':0,
    'Shadow Temple':0,
    'Spirit Temple':0,
    'Spirit Temple':0,
    'Bottom of the Well':0,
    'Gerudo Training Grounds':0,
    'Ganons Castle':0
  };
}

function hasBossKey(dungeon) {
  return dungeon in {
    'Forest Temple':0,
    'Fire Temple':0,
    'Water Temple':0,
    'Shadow Temple':0,
    'Spirit Temple':0,
    'Spirit Temple':0,
    'Ganons Castle':0
  };
}

function drawDungeon(dungeon) {
  idname = dungeon.replace(/\s/g, '');
  $('<div class="dungeon" id="'+idname+'"></div>').appendTo('.dungeons');
  $('<div class="dungeontitle"></div>').appendTo('#'+idname);
  $('#'+idname+' .dungeontitle').css("background-image", "url('images/"+nameToImageTitle[dungeon]+"')"); 
  medimage = getMedallionImage(dungeon);
  if (medimage != '') {
    imageEnable = knownMedallions[dungeon] in currentItemsAll;
    $('<div class="medallionimage'+ (!imageEnable ? ' disable' : '') +'"></div>').appendTo('#'+idname);
    $('#'+idname+' .medallionimage').css("background-image", "url('images/"+medimage+"')"); 
  }
  if (hasKeys(dungeon)) {
    keycount = ('Small Key ('+dungeon+')' in currentItemsAll ? currentItemsAll['Small Key ('+dungeon+')'] : 0);
    $('<div class="smallkeyimage'+ (keycount == 0 ? ' disable' : '') +'"></div>').appendTo('#'+idname);
    $('#'+idname+' .smallkeyimage').css("background-image", "url('images/"+ (keycount == 0 ? "small_key.png" : keycount + '.png') + "')"); 
  }
  if (hasBossKey(dungeon)) {
    bosskeycount = ('Boss Key ('+dungeon+')' in currentItemsAll ? 1 : 0);
    $('<div class="bosskeyimage'+ (bosskeycount == 0 ? ' disable' : '') +'"></div>').appendTo('#'+idname);
    $('#'+idname+' .bosskeyimage').css("background-image", "url('images/boss_key.png')");}
}

function drawDungeons() {
  for (var i = 0; i < dungeongrid.length; i++) {
    drawDungeon(dungeongrid[i]);
    $('<br/>').appendTo('.dungeons');
  }
}