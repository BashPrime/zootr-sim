var itemgrid = [
  [ "Slingshot", "Bomb Bag", "Bow", "Fire Arrows", "Dins Fire", "Zeldas Lullaby", "Minuet of Forest" ],
	[ "Progressive Wallet", "Boomerang", "Progressive Hookshot", "Light Arrows", "Farores Wind", "Eponas Song", "Bolero of Fire" ],
	[ "Bottle", "Lens of Truth", "Hammer", "Magic Meter", "Nayrus Love", "Sarias Song", "Serenade of Water" ],
	[ "Kokiri Sword", "Biggoron Sword", "Iron Boots", "Progressive Strength Upgrade", "Stone of Agony", "Suns Song", "Requiem of Spirit" ], 
	[ "Goron Tunic", "Zora Tunic", "Hover Boots", "Progressive Scale", "Child Trade", "Song of Time", "Nocturne of Shadow" ],
	[ "Deku Shield", "Hylian Shield", "Mirror Shield", "Gold Skulltulas", "Adult Trade", "Song of Storms", "Prelude of Light" ],
];

var codeToImage = {
  'Slingshot': ['slingshot.png', 'sling3.png', 'sling4.png', 'sling5.png'],
  'Bomb Bag': ['bomb.png', 'bomb2.png', 'bomb3.png', 'bomb4.png'],
  'Bow': ['bow.png', 'bow3.png', 'bow4.png', 'bow5.png'],
  'Fire Arrows': ['firearrow.png', 'firearrow.png'],
  'Dins Fire': ['din.png', 'din.png'],
  'Zeldas Lullaby': ['zelda.png', 'zelda.png'],
  'Minuet of Forest': ['green_note.png', 'green_note.png'],
  'Progressive Wallet': ['wallet.png', 'wallet1.png', 'wallet2.png'],
  'Boomerang': ['boomerang.png', 'boomerang.png'],
  'Progressive Hookshot': ['hookshotd.png', 'hookshot.png', 'longshot.png'],
  'Light Arrows': ['lightarrow.png', 'lightarrow.png'],
  'Farores Wind': ['farore.png', 'farore.png'],
  'Eponas Song': ['epona.png', 'epona.png'],
  'Bolero of Fire': ['red_note.png', 'red_note.png'],
  'Lens of Truth': ['lens.png', 'lens.png'],
  'Hammer': ['hammer.png', 'hammer.png'],
  'Magic Meter': ['magic.png', 'magic.png', 'magic2.png'],
  'Nayrus Love': ['nayru.png', 'nayru.png'],
  'Sarias Song': ['saria.png', 'saria.png'],
  'Serenade of Water': ['blue_note.png', 'blue_note.png'],
  'Kokiri Sword': ['sword1.png', 'sword1.png'],
  'Biggoron Sword': ['sword3.png', 'sword3.png'],
  'Iron Boots': ['ironboots.png', 'ironboots.png'],
  'Progressive Strength Upgrade': ['lift1.png', 'lift1.png', 'lift2.png', 'lift3.png'],
  'Stone of Agony': ['agony.png', 'agony.png'],
  'Suns Song': ['sunsong.png', 'sunsong.png'],
  'Requiem of Spirit': ['orange_note.png', 'orange_note.png'],
  'Goron Tunic': ['redtunic.png', 'redtunic.png'],
  'Zora Tunic': ['besttunic.png', 'besttunic.png'],
  'Hover Boots': ['hoverboots.png', 'hoverboots.png'],
  'Progressive Scale': ['scale1.png', 'scale1.png', 'scale2.png'],
  'Song of Time': ['songoftime.png', 'songoftime.png'],
  'Nocturne of Shadow': ['purple_note.png', 'purple_note.png'],
  'Deku Shield': ['shield1.png', 'shield1.png', 'shield1.png', 'shield1.png', 'shield1.png'],
  'Hylian Shield': ['shield2.png', 'shield2.png', 'shield2.png', 'shield2.png'],
  'Mirror Shield': ['shield3.png', 'shield3.png'],
  'Song of Storms': ['songofstorms.png', 'songofstorms.png'],
  'Prelude of Light': ['yellow_note.png', 'yellow_note.png']
};

function getImage(item, count) {
  if (item == 'Bottle') {
    var bottles = 0;
    var hasLetter = false;
    for (key in currentItemsAll) {
      if (key.startsWith('Bottle')) {
        bottles++;
        if (key == 'Bottle with Letter') {
          hasLetter = true;
        }
      }
    }
    return [(hasLetter ? 'ruto' : '') + 'bottle' + bottles + '.png', bottles > 0]
  }
  else if (item == 'Child Trade') {
    retval = [];
    if (!('Weird Egg' in currentItemsAll)) {
      return ['egg.png', false];
    }
    if ('Weird Egg' in currentItemsAll) {
      retval = ['egg.png', true];
    }
    if ('Chicken' in currentItemsAll) {
      retval = ['cucco.png', true];
    }
    if ('Zeldas Letter' in currentItemsAll) {
      retval = ['letter.png', true];
    }
    if ('Keaton Mask' in currentItemsAll) {
      retval = ['keaton.png', true];
    }
    if ('Skull Mask' in currentItemsAll) {
      retval = ['skull.png', true];
    }
    if ('Spooky Mask' in currentItemsAll) {
      retval = ['spooky.png', true];
    }
    if ('Bunny Hood' in currentItemsAll) {
      retval = ['bunny.png', true];
    }
    if ('Mask of Truth' in currentItemsAll) {
      retval = ['truth.png', true];
    }
    return retval;
  }
  else if (item == 'Adult Trade') {
    if ('Claim Check' in currentItemsAll) {
      return ['claim.png', true];
    }
    if ('Eyedrops' in currentItemsAll) {
      return ['eyedrops.png', true];
    }
    if ('Eyeball Frog' in currentItemsAll) {
      return ['frog.png', true];
    }
    if ('Prescription' in currentItemsAll) {
      return ['prescription.png', true];
    }
    if ('Broken Sword' in currentItemsAll) {
      return ['broken_sword.png', true];
    }
    if ('Poachers Saw' in currentItemsAll) {
      return ['saw.png', true];
    }
    if ('Odd Mushroom' in currentItemsAll) {
      return ['mushroom.png', true];
    }
    if ('Cojiro' in currentItemsAll) {
      return ['cojiro.png', true];
    }
    if ('Pocket Cucco' in currentItemsAll) {
      return ['cucco.png', true];
    }
    if ('Pocket Egg' in currentItemsAll) {
      return ['egg.png', true];
    }
    else {
      return ['egg.png', false];
    }
  }
  else if (item == 'Gold Skulltulas') {
    return ['skulltula.png', false];
  }
  else {
    return [codeToImage[item][count], count > 0];
  }
}

function drawItems() {
  for (var i = 0; i < itemgrid.length; i++) {
    for (var j = 0; j < itemgrid[i].length; j++) {
      item = itemgrid[i][j];
      idname = item.replace(/\s/g, '');
      count = (item in currentItemsAll) ? currentItemsAll[item] : 0;
      image = getImage(item, count);
      imagename = image[0];
      imageEnable = image[1];
      $('<div class="item'+ (!imageEnable ? ' disable' : '') +'" id="'+idname+'"></div>').appendTo('.items');
      $('#'+idname).css("background-image", "url('images/"+imagename+"')");  
    }
    $('<br/>').appendTo('.items');
  }
}