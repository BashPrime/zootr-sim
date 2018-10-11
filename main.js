function getInitialState() {
  return {
    playing: false,
    currentRegion: 'Kokiri Forest',
    
    currentChild: 1,
    currentAdult: 0,
    
    currentAge: 'Child',
    
    currentItemsAll: [],
    currentItemsImportant: [],
    
    usedChus: 0,
    
    numChecksMade: 0,
    totalChecks: 0,
    
    testSpoiler: {},
  
    checkedLocations: [],
    
    medallions: {},
    
    lighthint: '',
    
    knownMedallions: {
      'Deku Tree': '???',
      'Dodongos Cavern': '???',
      'Jabu Jabus Belly': '???',
      'Forest Temple': '???',
      'Fire Temple': '???',
      'Water Temple': '???',
      'Shadow Temple': '???',
      'Spirit Temple': '???',
      'Free': '???',
    },
  };
}

var state = getInitialState();

var importantItems = [
  'Bow',
  'Progressive Hookshot',
  'Hammer',
  'Slingshot',
  'Boomerang',
  'Bomb Bag',
  'Lens of Truth',
  'Dins Fire',
  'Farores Wind',
  'Nayrus Love',
  'Fire Arrows',
  'Ice Arrows',
  'Light Arrows',
  'Fairy Ocarina',
  'Ocarina of Time',
  'Ocarina',
  'Bottle',
  'Bottle with Letter',
  'Bottle with Milk',
  'Bottle with Red Potion',
  'Bottle with Green Potion',
  'Bottle with Blue Potion',
  'Bottle with Fairy',
  'Bottle with Fish',
  'Bottle with Blue Fire',
  'Bottle with Bugs',
  'Bottle with Poe',
  'Weird Egg',
  'Pocket Egg',
  'Pocket Cucco',
  'Cojiro',
  'Odd Mushroom',
  'Odd Potion',
  'Poachers Saw',
  'Broken Sword',
  'Prescription',
  'Eyeball Frog',
  'Eyedrops',
  'Claim Check',
  'Kokiri Sword',
  'Master Sword',
  'Biggoron Sword',
  'Mirror Shield',
  'Goron Tunic',
  'Zora Tunic',
  'Iron Boots',
  'Hover Boots',
  'Progressive Strength Upgrade',
  'Progressive Scale',
  'Progressive Wallet',
  'Magic Meter',
  'Stone of Agony',
  'Bombchus (5)',
  'Bombchus (10)',
  'Bombchus (20)',
  'Bombchus',
  'Magic Bean',
  'Boss Key',
  'Small Key',
  'Boss Key (Forest Temple)',
  'Boss Key (Fire Temple)',
  'Boss Key (Water Temple)',
  'Boss Key (Spirit Temple)',
  'Boss Key (Shadow Temple)',
  'Boss Key (Ganons Castle)',
  'Small Key (Forest Temple)',
  'Small Key (Fire Temple)',
  'Small Key (Water Temple)',
  'Small Key (Spirit Temple)',
  'Small Key (Shadow Temple)',
  'Small Key (Bottom of the Well)',
  'Small Key (Gerudo Training Grounds)',
  'Small Key (Gerudo Fortress)',
  'Small Key (Ganons Castle)',
  'Zeldas Letter',
  'Zeldas Lullaby',
  'Eponas Song',
  'Suns Song',
  'Sarias Song',
  'Song of Time',
  'Song of Storms',
  'Minuet of Forest',
  'Prelude of Light',
  'Bolero of Fire',
  'Serenade of Water',
  'Nocturne of Shadow',
  'Requiem of Spirit',
  'Gold Skulltulla Token',
  'Epona',
  'Gerudo Membership Card',
  'Forest Trial Clear',
  'Fire Trial Clear',
  'Water Trial Clear',
  'Shadow Trial Clear',
  'Spirit Trial Clear',
  'Light Trial Clear',
  'Triforce',
];

var warpSongs = ['Minuet of Forest', 'Bolero of Fire', 'Serenade of Water', 'Nocturne of Shadow', 'Requiem of Spirit', 'Prelude of Light'];

var songTargets = {
  'Minuet of Forest': 'Lost Woods',
  'Bolero of Fire': 'Death Mountain Crater',
  'Serenade of Water': 'Lake Hylia',
  'Nocturne of Shadow': 'Above Graveyard',
  'Requiem of Spirit': 'Desert Colossus',
  'Prelude of Light': 'Temple of Time'
}

var bosses = {
  'Links Pocket': 'Free',
  'Queen Gohma': 'Deku Tree',
  'King Dodongo': 'Dodongos Cavern',
  'Barinade': 'Jabu Jabus Belly',
  'Phantom Ganon': 'Forest Temple',
  'Volvagia': 'Fire Temple',
  'Morpha': 'Water Temple',
  'Bongo Bongo': 'Shadow Temple',
  'Twinrova': 'Spirit Temple'
};

var regionChangingChecks = {
  'Impa at Castle': 'Hyrule Field',
  'Queen Gohma': 'Kokiri Forest',
  'King Dodongo': 'Death Mountain Trail',
  'Barinade': 'Zoras Fountain',
  'Phantom Ganon': 'Kokiri Forest',
  'Volvagia': 'Death Mountain Crater',
  'Morpha': 'Lake Hylia',
  'Bongo Bongo': 'Above Graveyard',
  'Twinrova': 'Desert Colossus',
};



var locationsByRegionChild = {
  'Kokiri Forest': ['Kokiri Sword Chest', 'Mido Chest Top Left', 'Mido Chest Top Right', 'Mido Chest Bottom Left', 'Mido Chest Bottom Right', 'Kokiri Forest Storms Grotto Chest'],
  'Deku Tree': ['Deku Tree Lobby Chest', 'Deku Tree Compass Chest', 'Deku Tree Compass Room Side Chest', 'Deku Tree Basement Chest', 'Deku Tree Slingshot Chest', 'Deku Tree Slingshot Room Side Chest', 'Queen Gohma Heart', 'Queen Gohma'],
  'Lost Woods': ['Skull Kid', 'Ocarina Memory Game', 'Target in Woods', 'Deku Salesman Woods', 'Song from Saria', 'Lost Woods Generic Grotto Chest', 'Deku Theater Skull Mask', 'Deku Theater Mask of Truth', 'Deku Salesman Lost Woods Grotto', 'Wolfos Grotto Chest'],
  'Hyrule Field': ['Ocarina of Time', 'Song from Ocarina of Time', 'Remote Southern Grotto Chest', 'Field Near Lake Outside Fence Grotto Chest', 'Deku Salesman Hyrule Field Grotto', 'Field West Castle Town Grotto Chest', 'Tektite Grotto Freestanding PoH'],
  'Market': ['Child Shooting Gallery', 'Bombchu Bowling Bomb Bag', 'Bombchu Bowling Piece of Heart', 'Treasure Chest Game', 'Dog Lady'],
  'Temple of Time': ['Check Pedestal (Stones)'],
  'Hyrule Castle': ['Malon Egg', 'Hyrule Castle Fairy Reward', 'Impa at Castle'],
  'Lon Lon Ranch': ['Talons Chickens', 'Lon Lon Tower Freestanding PoH', 'Song from Malon'],
  'Lake Hylia': ['Underwater Bottle', 'Diving in the Lab', 'Child Fishing'],
  'Gerudo Valley': ['Gerudo Valley Waterfall Freestanding PoH', 'Gerudo Valley Crate Freestanding PoH'],
  'Desert Colossus': ['Desert Colossus Fairy Reward', 'Sheik at Colossus'],
  'Spirit Temple': ['Spirit Temple Child Left Chest', 'Spirit Temple Child Right Chest', 'Spirit Temple Map Chest', 'Spirit Temple Child Climb East Chest', 'Spirit Temple Child Climb North Chest', 'Spirit Temple Sun Block Room Chest', 'Silver Gauntlets Chest'],
  'Kakariko Village': ['Anjus Chickens', '10 Gold Skulltulla Reward', '20 Gold Skulltulla Reward', '30 Gold Skulltulla Reward', '40 Gold Skulltulla Reward', '50 Gold Skulltulla Reward', 'Impa House Freestanding PoH', 'Windmill Freestanding PoH', 'Man on Roof', 'Redead Grotto Chest', 'Kakariko Back Grotto Chest'],
  'Bottom of the Well': ['Bottom of the Well Front Left Hidden Wall', 'Bottom of the Well Front Center Bombable', 'Bottom of the Well Right Bottom Hidden Wall', 'Bottom of the Well Center Large Chest', 'Bottom of the Well Center Small Chest', 'Bottom of the Well Back Left Bombable', 'Bottom of the Well Freestanding Key', 'Bottom of the Well Defeat Boss', 'Bottom of the Well Invisible Chest', 'Bottom of the Well Underwater Front Chest', 'Bottom of the Well Underwater Left Chest', 'Bottom of the Well Basement Chest', 'Bottom of the Well Locked Pits', 'Bottom of the Well Behind Right Grate'],
  'Above Graveyard': [],
  'Graveyard': ['Graveyard Freestanding PoH', 'Gravedigging Tour', 'Shield Grave Chest', 'Heart Piece Grave Chest', 'Composer Grave Chest', 'Song from Composer Grave'],
  'Death Mountain Trail': ['Death Mountain Bombable Chest', 'DM Trail Freestanding PoH', 'Mountain Storms Grotto Chest', 'Mountain Summit Fairy Reward'],
  'Death Mountain Crater': ['Top of Crater Grotto Chest', 'DM Crater Wall Freestanding PoH'],
  'Goron City': ['Goron City Left Maze Chest', 'Goron City Right Maze Chest', 'Goron City Pot Freestanding PoH', 'Rolling Goron as Child', 'Darunias Joy'],
  'Dodongos Cavern': ['Dodongos Cavern Map Chest', 'Dodongos Cavern Compass Chest', 'Dodongos Cavern Bomb Flower Platform', 'Dodongos Cavern Bomb Bag Chest', 'Dodongos Cavern End of Bridge Chest', 'Chest Above King Dodongo', 'King Dodongo Heart', 'King Dodongo'],
  'Zora River': ['Zora River Lower Freestanding PoH', 'Zora River Upper Freestanding PoH', 'Frog Ocarina Game', 'Frogs in the Rain', 'Zora River Plateau Open Grotto Chest'],
  'Zoras Domain': ['Diving Minigame', 'Zoras Domain Torch Run', 'King Zora Moves'],
  'Zoras Fountain': ['Zoras Fountain Fairy Reward'],
  'Jabu Jabus Belly': ['Boomerang Chest', 'Jabu Jabus Belly Map Chest', 'Jabu Jabus Belly Compass Chest', 'Barinade Heart', 'Barinade'],
};

var entrancesByRegionChild = {
  'Kokiri Forest': ['Deku Tree', 'Lost Woods', 'Hyrule Field'],
  'Deku Tree': ['Kokiri Forest'],
  'Lost Woods': ['Kokiri Forest', 'Goron City', 'Zora River'],
  'Hyrule Field': ['Kokiri Forest', 'Market', 'Kakariko Village', 'Zora River', 'Lon Lon Ranch', 'Gerudo Valley', 'Lake Hylia'],
  'Market': ['Hyrule Field', 'Temple of Time', 'Hyrule Castle'],
  'Temple of Time': ['Market', 'Pull Master Sword'],
  'Hyrule Castle': ['Market'],
  'Lon Lon Ranch': ['Hyrule Field'],
  'Lake Hylia': ['Hyrule Field', 'Zoras Domain'],
  'Gerudo Valley': ['Hyrule Field', 'Lake Hylia'],
  'Desert Colossus': ['Spirit Temple'],
  'Spirit Temple': ['Desert Colossus'],
  'Kakariko Village': ['Hyrule Field', 'Bottom of the Well', 'Death Mountain Trail', 'Graveyard'],
  'Bottom of the Well': ['Kakariko Village'],
  'Above Graveyard': ['Graveyard'],
  'Graveyard': ['Kakariko Village'],
  'Death Mountain Trail': ['Death Mountain Crater', 'Goron City', 'Kakariko Village', 'Dodongos Cavern'],
  'Death Mountain Crater': ['Death Mountain Trail'],
  'Goron City': ['Lost Woods', 'Death Mountain Trail'],
  'Dodongos Cavern': ['Death Mountain Trail'],
  'Zora River': ['Zoras Domain', 'Lost Woods', 'Hyrule Field'],
  'Zoras Domain': ['Zoras Fountain', 'Zora River', 'Lake Hylia'],
  'Zoras Fountain': ['Zoras Domain', 'Jabu Jabus Belly'],
  'Jabu Jabus Belly': ['Zoras Fountain'],
};

var locationsByRegionAdult = {
  'Kokiri Forest': ['Kokiri Forest Storms Grotto Chest'],
  'Lost Woods': ['Deku Salesman Woods', 'Lost Woods Generic Grotto Chest', 'Deku Salesman Lost Woods Grotto', 'Wolfos Grotto Chest', 'Sheik Forest Song'],
  'Forest Temple': ['Forest Temple First Chest', 'Forest Temple Chest Behind Lobby', 'Forest Temple Outside Hookshot Chest', 'Forest Temple Map Chest', 'Forest Temple Well Chest', 'Forest Temple Block Push Chest', 'Forest Temple Floormaster Chest', 'Forest Temple Boss Key Chest', 'Forest Temple Red Poe Chest', 'Forest Temple Bow Chest',  'Forest Temple Blue Poe Chest', 'Forest Temple Falling Room Chest', 'Forest Temple Near Boss Chest', 'Phantom Ganon Heart', 'Phantom Ganon'],
  'Hyrule Field': ['Remote Southern Grotto Chest', 'Field Near Lake Outside Fence Grotto Chest', 'Deku Salesman Hyrule Field Grotto', 'Field West Castle Town Grotto Chest', 'Tektite Grotto Freestanding PoH'],
  'Market': ['10 Big Poes'],
  'Temple of Time': ['Sheik at Temple', 'Zelda', 'Check Pedestal (Medallions)'],
  'Lon Lon Ranch': [],
  'Lake Hylia': ['Lake Hylia Sun', 'Lake Hylia Freestanding PoH', 'Diving in the Lab', 'Adult Fishing'],
  'Water Temple': ['Water Temple Map Chest', 'Water Temple Compass Chest', 'Water Temple Torches Chest', 'Water Temple Dragon Chest', 'Water Temple Central Bow Target Chest', 'Water Temple Boss Key Chest', 'Morpha Heart', 'Water Temple Central Pillar Chest', 'Water Temple Cracked Wall Chest', 'Water Temple Dark Link Chest', 'Water Temple River Chest', 'Morpha'],
  'Gerudo Valley': ['Gerudo Valley Waterfall Freestanding PoH', 'Gerudo Valley Crate Freestanding PoH'],
  'Gerudo Fortress': ['Gerudo Valley Hammer Rocks Chest', 'Gerudo Fortress Rooftop Chest', 'Horseback Archery 1000 Points', 'Horseback Archery 1500 Points'],
  'Gerudo Training Grounds': ['Gerudo Training Grounds Lobby Left Chest', 'Gerudo Training Grounds Lobby Right Chest', 'Gerudo Training Grounds Stalfos Chest', 'Gerudo Training Grounds Before Heavy Block Chest', 'Gerudo Training Grounds Heavy Block First Chest', 'Gerudo Training Grounds Heavy Block Second Chest', 'Gerudo Training Grounds Heavy Block Third Chest', 'Gerudo Training Grounds Heavy Block Fourth Chest',  'Gerudo Training Grounds Eye Statue Chest', 'Gerudo Training Grounds Near Scarecrow Chest', 'Gerudo Training Grounds Hammer Room Clear Chest', 'Gerudo Training Grounds Hammer Room Switch Chest', 'Gerudo Training Grounds Underwater Silver Rupee Chest', 'Gerudo Training Grounds Maze Right Central Chest', 'Gerudo Training Grounds Maze Right Side Chest', 'Gerudo Training Grounds Freestanding Key', 'Gerudo Training Grounds Beamos Chest', 'Gerudo Training Grounds Hidden Ceiling Chest', 'Gerudo Training Grounds Maze Path First Chest', 'Gerudo Training Grounds Maze Path Second Chest', 'Gerudo Training Grounds Maze Path Third Chest', 'Gerudo Training Grounds Maze Path Final Chest' ],
  'Haunted Wasteland': ['Haunted Wasteland Structure Chest'],
  'Desert Colossus': ['Colossus Freestanding PoH', 'Desert Colossus Fairy Reward', 'Sheik at Colossus'],
  'Spirit Temple': ['Spirit Temple Compass Chest', 'Spirit Temple Early Adult Right Chest', 'Spirit Temple First Mirror Right Chest', 'Spirit Temple First Mirror Left Chest', 'Spirit Temple Map Chest', 'Spirit Temple Child Climb East Chest', 'Spirit Temple Child Climb North Chest', 'Spirit Temple Sun Block Room Chest', 'Spirit Temple Statue Hand Chest', 'Spirit Temple NE Main Room Chest', 'Silver Gauntlets Chest', 'Mirror Shield Chest', 'Spirit Temple Near Four Armos Chest', 'Spirit Temple Hallway Left Invisible Chest', 'Spirit Temple Hallway Right Invisible Chest', 'Spirit Temple Boss Key Chest', 'Spirit Temple Topmost Chest', 'Twinrova Heart', 'Twinrova'],
  'Kakariko Village': ['Anju as Adult', 'Man on Roof', '10 Gold Skulltulla Reward', '20 Gold Skulltulla Reward', '30 Gold Skulltulla Reward', '40 Gold Skulltulla Reward', '50 Gold Skulltulla Reward', 'Impa House Freestanding PoH', 'Windmill Freestanding PoH', 'Adult Shooting Gallery', 'Redead Grotto Chest', 'Kakariko Back Grotto Chest', 'Sheik in Kakariko', 'Song at Windmill'],
  'Graveyard': ['Graveyard Freestanding PoH', 'Shield Grave Chest', 'Heart Piece Grave Chest', 'Composer Grave Chest', 'Hookshot Chest', 'Dampe Race Freestanding PoH', 'Song from Composer Grave'],
  'Above Graveyard': [],
  'Shadow Temple': ['Shadow Temple Map Chest', 'Shadow Temple Hover Boots Chest', 'Shadow Temple Compass Chest', 'Shadow Temple Early Silver Rupee Chest', 'Shadow Temple Invisible Blades Visible Chest', 'Shadow Temple Invisible Blades Invisible Chest', 'Shadow Temple Falling Spikes Lower Chest', 'Shadow Temple Falling Spikes Upper Chest', 'Shadow Temple Falling Spikes Switch Chest', 'Shadow Temple Invisible Spikes Chest', 'Shadow Temple Freestanding Key', 'Shadow Temple Wind Hint Chest', 'Shadow Temple After Wind Enemy Chest', 'Shadow Temple After Wind Hidden Chest', 'Shadow Temple Spike Walls Left Chest', 'Shadow Temple Boss Key Chest', 'Shadow Temple Hidden Floormaster Chest', 'Bongo Bongo Heart', 'Bongo Bongo'],
  'Death Mountain Trail': ['Death Mountain Bombable Chest', 'DM Trail Freestanding PoH', 'Mountain Storms Grotto Chest', 'Mountain Summit Fairy Reward', 'Biggoron'],
  'Death Mountain Crater': ['Top of Crater Grotto Chest', 'DM Crater Wall Freestanding PoH', 'DM Crater Volcano Freestanding PoH', 'Crater Fairy Reward', 'Sheik in Crater'],
  'Fire Temple': ['Fire Temple Chest Near Boss', 'Fire Temple Fire Dancer Chest', 'Fire Temple Boss Key Chest', 'Fire Temple Big Lava Room Bombable Chest', 'Fire Temple Big Lava Room Open Chest', 'Volvagia Heart', 'Volvagia', 'Fire Temple Boulder Maze Lower Chest', 'Fire Temple Boulder Maze Upper Chest', 'Fire Temple Boulder Maze Side Room', 'Fire Temple Boulder Maze Bombable Pit', 'Fire Temple Scarecrow Chest', 'Fire Temple Map Chest', 'Fire Temple Compass Chest', 'Fire Temple Highest Goron Chest', 'Fire Temple Megaton Hammer Chest'],
  'Goron City': ['Goron City Leftmost Maze Chest', 'Goron City Left Maze Chest', 'Goron City Right Maze Chest', 'Link the Goron'],
  'Dodongos Cavern': ['Dodongos Cavern Map Chest', 'Dodongos Cavern Compass Chest', 'Dodongos Cavern Bomb Flower Platform', 'Dodongos Cavern Bomb Bag Chest', 'Dodongos Cavern End of Bridge Chest', 'Chest Above King Dodongo', 'King Dodongo Heart', 'King Dodongo'],
  'Zora River': ['Zora River Lower Freestanding PoH', 'Zora River Upper Freestanding PoH', 'Zora River Plateau Open Grotto Chest'],
  'Zoras Domain': ['King Zora Thawed'],
  'Zoras Fountain': ['Zoras Fountain Iceberg Freestanding PoH', 'Zoras Fountain Bottom Freestanding PoH', 'Zoras Fountain Fairy Reward'],
  'Ice Cavern': ['Ice Cavern Map Chest', 'Ice Cavern Compass Chest', 'Ice Cavern Iron Boots Chest', 'Ice Cavern Freestanding PoH', 'Sheik in Ice Cavern'],
  'Outside Ganons Castle': ['Ganons Castle Fairy Reward'],
  'Ganons Castle': ['Ganons Castle Forest Trial Chest', 'Ganons Castle Water Trial Left Chest', 'Ganons Castle Water Trial Right Chest', 'Ganons Castle Shadow Trial First Chest', 'Ganons Castle Shadow Trial Second Chest', 'Ganons Castle Spirit Trial First Chest', 'Ganons Castle Spirit Trial Second Chest', 'Ganons Castle Light Trial First Left Chest', 'Ganons Castle Light Trial Second Left Chest', 'Ganons Castle Light Trial Third Left Chest', 'Ganons Castle Light Trial First Right Chest', 'Ganons Castle Light Trial Second Right Chest', 'Ganons Castle Light Trial Third Right Chest', 'Ganons Castle Light Trail Invisible Enemies Chest', 'Ganons Castle Light Trial Lullaby Chest', 'Ganons Tower Boss Key Chest', 'Light Arrows Hint', 'Ganon']
};

var entrancesByRegionAdult = {
  'Kokiri Forest': ['Lost Woods', 'Hyrule Field'],
  'Lost Woods': ['Kokiri Forest', 'Goron City', 'Zora River', 'Forest Temple'],
  'Forest Temple': ['Lost Woods'],
  'Hyrule Field': ['Kokiri Forest', 'Market', 'Kakariko Village', 'Zora River', 'Lon Lon Ranch', 'Gerudo Valley', 'Lake Hylia'],
  'Market': ['Hyrule Field', 'Temple of Time', 'Outside Ganons Castle'],
  'Temple of Time': ['Market', 'Place Master Sword'],
  'Lon Lon Ranch': ['Hyrule Field'],
  'Lake Hylia': ['Hyrule Field', 'Water Temple'],
  'Water Temple': ['Lake Hylia'],
  'Gerudo Valley': ['Hyrule Field', 'Lake Hylia', 'Gerudo Fortress'],
  'Gerudo Fortress': ['Haunted Wasteland', 'Gerudo Valley', 'Gerudo Training Grounds'],
  'Gerudo Training Grounds': ['Gerudo Fortress'],
  'Haunted Wasteland': ['Gerudo Fortress', 'Desert Colossus'],
  'Desert Colossus': ['Spirit Temple', 'Haunted Wasteland'],
  'Spirit Temple': ['Desert Colossus'],
  'Kakariko Village': ['Hyrule Field', 'Death Mountain Trail', 'Graveyard'],
  'Graveyard': ['Kakariko Village'],
  'Above Graveyard': ['Shadow Temple', 'Graveyard'],
  'Shadow Temple': ['Above Graveyard'],
  'Death Mountain Trail': ['Death Mountain Crater', 'Goron City', 'Kakariko Village', 'Dodongos Cavern'],
  'Death Mountain Crater': ['Death Mountain Trail', 'Fire Temple', 'Goron City'],
  'Fire Temple': ['Death Mountain Crater'],
  'Goron City': ['Lost Woods', 'Death Mountain Trail', 'Death Mountain Crater'],
  'Dodongos Cavern': ['Death Mountain Trail'],
  'Zora River': ['Zoras Domain', 'Lost Woods', 'Hyrule Field'],
  'Zoras Domain': ['Zoras Fountain', 'Zora River'],
  'Zoras Fountain': ['Zoras Domain', 'Ice Cavern'],
  'Ice Cavern': ['Zoras Fountain'],
  'Outside Ganons Castle': ['Ganons Castle', 'Market'],
  'Ganons Castle': ['Outside Ganons Castle']
};

$(function() {  
  
  localforage.getItem('state', function (err, val) {
    if (val && val.playing) {
      state = val;
      localforage.getItem('route', (err, val) => $('.route').html(val));
      updateAccessible();
      updateCollected();
      updateMedallions();
      $('#files').hide();
      $('#reset').show();
    }
  });
  
  $('#reset').hide();
  
  var fileInput = $('#files');
  
  fileInput.on('change', function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);
    
    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
  });

  function processFile(e) {
      var file = e.target.result,
          results;
      if (file && file.length) {
        try {
          results = file.split("Locations:")[1].split("Playthrough:")[0].split('\n').filter(el => el.trim() != "");
          state.totalChecks = results.length;
          for (var i = 0; i < results.length; i++) {
            loc = results[i].split(':')[0].trim();
            item = results[i].split(':')[1].trim();
            state.testSpoiler[loc] = item;
          }
          state.checkedLocations.push('Links Pocket');
          state.currentItemsAll.push(state.testSpoiler['Links Pocket']);
          state.numChecksMade++;
          state.knownMedallions['Free'] = state.testSpoiler['Links Pocket'];
          state.medallions['Free'] = state.testSpoiler['Links Pocket'];
          state.medallions['Deku Tree'] = state.testSpoiler['Queen Gohma'];
          state.medallions['Dodongos Cavern'] = state.testSpoiler['King Dodongo'];
          state.medallions['Jabu Jabus Belly'] = state.testSpoiler['Barinade'];
          state.medallions['Forest Temple'] = state.testSpoiler['Phantom Ganon'];
          state.medallions['Fire Temple'] = state.testSpoiler['Volvagia'];
          state.medallions['Water Temple'] = state.testSpoiler['Morpha'];
          state.medallions['Shadow Temple'] = state.testSpoiler['Bongo Bongo'];
          state.medallions['Spirit Temple'] = state.testSpoiler['Twinrova'];
          $('<span>---- CHILD ' + state.currentChild + ' ----</span><br/><br/>').appendTo('.route');
          state.playing = true;
          updateAccessible();
          updateCollected();
          updateMedallions();
          updateForage();
          $('#files').hide();
          $('#reset').show();
        }
        catch(err) {
          console.log(err);
          alert('Error parsing file! Please choose a randomizer spoiler log.');
        }
      }
  }
  
  var updateAccessible = function() {
    $('.current p').remove();
    $('.current a').remove();
    $('.current br').remove();
    $('.current span').remove();
    $('<p>Current Region: ' + state.currentRegion + ' [' + state.currentAge + ']</p>').appendTo('.current');
    locations = state.currentAge == 'Child' ? locationsByRegionChild : locationsByRegionAdult;
    entrances = state.currentAge == 'Child' ? entrancesByRegionChild : entrancesByRegionAdult;
    for (var i = 0; i < locations[state.currentRegion].length; i++) {
      key = locations[state.currentRegion][i];
      if ($.inArray(key, state.checkedLocations) == -1) {
        //if (!(key in logicDict) || logicDict[key]()) {
        if (true) {
          $('<a class="location" id="' + key + '">' + key + '</a><br/>').appendTo('.current');
        }
      }
      else {
        $('<span class="location checked" id="' + key + '">' + key + '</span><br/>').appendTo('.current');
      }
    }
    if (locations[state.currentRegion].length > 0) {
      $('<br/>').appendTo('.current');
    }
    for (var i = 0; i < entrances[state.currentRegion].length; i++) {
      key = entrances[state.currentRegion][i];
    //  if (!(key in logicDict) || logicDict[key]()) {
      if (true) {
        $('<a class="entrance" id="' + key + '">To ' + key + '</a><br/>').appendTo('.current');
      }
    }
    collectedWarps = state.currentItemsAll.filter(value => -1 !== warpSongs.indexOf(value));
    for (var i = 0; i < collectedWarps.length; i++)
    {
      if (i == 0) {
        $('<p>WARPS</p>').appendTo('.current');
      }
      $('<a class="entrance" id="' + collectedWarps[i] + '">Play ' + collectedWarps[i] + '</a><br/>').appendTo('.current');
    }
    $('<br/><a class="entrance" id="Savewarp ' + state.currentAge  + '">Savewarp to ' + (state.currentAge == 'Child' ? 'Kokiri Forest' : 'Temple of Time') + '</a><br/>').appendTo('.current');
  };
  
  var updateCollected = function() {
    $('.tracker span').remove();
    $('.tracker br').remove();
    $('.tracker div').remove();
    $('.tracker a').remove();
    $('<div class="items"></div>').appendTo('.tracker');
    drawItems();
    $('<div class="dungeons"></div>').appendTo('.tracker');
    drawDungeons();
    $('<br/><br/><span>' + state.numChecksMade + '/' + state.totalChecks + ' checks made</span>').appendTo('.tracker');
    ownedChus = state.currentItemsAll.filter(item => item.includes('Bombchus'));
    chuCount = ownedChus.map(item => parseInt(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')')), 10)).reduce((a,b) => a + b, 0);
    if (state.usedChus > chuCount) {
      state.usedChus = chuCount;
    }
    if (chuCount > 0) {
      $('<br/><br/><span>Bombchus: ' + (chuCount - state.usedChus) + '</span> <a class="useChu">Use Bombchu</a>').appendTo('.tracker');
    }
    if (state.lighthint != '') {
      $('<br/><br/><span>Light Arrows Hint: ' + state.lighthint + '</span>').appendTo('.tracker');
    }
  };
  
  var updateMedallions = function() {
    $('.medallions p').remove();
    $('.medallions div').remove();
    $('.medallions br').remove();
    //drawDungeons();
  };
  
  var updateForage = function() {
    localforage.setItem('state', state);
    localforage.setItem('route', $('.route').html());
  };

  $(document).on('click', 'a.useChu', function(event) {
    state.usedChus++;
    updateCollected();
    updateForage();
  });
  
  $(document).on('click', 'a.location', function(event) {
    if (event.target.id.startsWith('Check Pedestal')) {
      state.checkedLocations.push(event.target.id);
      if (state.currentAge == 'Adult') {
        state.checkedLocations.push('Check Pedestal (Stones)');
      }
      for (var key in state.medallions) {
        if ($.inArray(state.medallions[key], state.currentItemsAll) == -1) {
          if (state.medallions[key].includes('Medallion')) {
            if (state.currentAge == 'Adult') {
              state.knownMedallions[key] = state.medallions[key];
            }
          }
          else {
            knownMedallions[key] = medallions[key];
          }
        }
      }
    }
    else if (event.target.id == 'Light Arrows Hint') {
      state.checkedLocations.push(event.target.id);
      lightlocation = Object.keys(state.testSpoiler).find(key => state.testSpoiler[key] === 'Light Arrows');
      state.lighthint = Object.keys(locationsByRegionAdult).find(key => $.inArray(lightlocation, locationsByRegionAdult[key]) != -1);
      if (typeof state.lighthint == 'undefined') {
        state.lighthint = Object.keys(locationsByRegionChild).find(key => $.inArray(lightlocation, locationsByRegionChild[key]) != -1);
      }
      $('<span>Light Arrows Hint ('+state.lighthint+')</span><br/>').appendTo('.route');
    }
    else if (event.target.id == 'Ganon') {
      if ($.inArray('Light Arrows', state.currentItemsAll) == -1) {
        $('.lastchecked span').remove();
        $('<span>Not without Light Arrows!</span>').appendTo('.lastchecked');
      }
      else {
        $('.lastchecked span').remove();
        $('<span>Congratulations!</span>').appendTo('.lastchecked');
        $('<span>Ganon (Triforce)</span><br/><br/>').appendTo('.route');
        $('<span>Total Checks Made: '+state.numChecksMade+'/'+state.totalChecks+'</span><br/>').appendTo('.route');
      }
    }
    else
    {
      state.numChecksMade++;
      if (event.target.id in bosses) {
        state.knownMedallions[bosses[event.target.id]] = state.testSpoiler[event.target.id];
      }
      state.checkedLocations.push(event.target.id);
      item = state.testSpoiler[event.target.id];
      state.currentItemsAll.push(item);
      if ($.inArray(item, importantItems) != -1) {
        state.currentItemsImportant.push(item);
      }
      toAppend = '<span>' + event.target.id + ($.inArray(item, importantItems) != -1 ? ' (' + item + ')' : '') + '</span><br/>';
      $(toAppend).appendTo('.route');
      $('.lastchecked span').remove();
      $('<span>' + event.target.id + ': ' + item + '</span>').appendTo('.lastchecked');
      if (event.target.id in regionChangingChecks) {
        state.currentRegion = regionChangingChecks[event.target.id];
      }
    }
    
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateForage();
  });
  
  $(document).on('click', 'a.entrance', function(event) {
    if (event.target.id == 'Pull Master Sword') {
      state.currentAdult++;
      $('<br/><span>---- ADULT ' + state.currentAdult + ' ----</span><br/><br/>').appendTo('.route');
      state.currentAge = 'Adult';
    }
    else if (event.target.id == 'Place Master Sword') {
      state.currentChild++;
      $('<br/><span>---- CHILD ' + state.currentChild + ' ----</span><br/><br/>').appendTo('.route');
      state.currentAge = 'Child';
    }
    else if (event.target.id == 'Savewarp Child') {
      state.currentRegion = 'Kokiri Forest';
      $('<span>Savewarp</span><br/>').appendTo('.route');
    }
    else if (event.target.id == 'Savewarp Adult') {
      state.currentRegion = 'Temple of Time';
      $('<span>Savewarp</span><br/>').appendTo('.route');
    }
    else if (event.target.id in songTargets) {
      state.currentRegion = songTargets[event.target.id];
      $('<span>Play '+event.target.id+'</span><br/>').appendTo('.route');
    }
    else if (state.currentRegion == 'Kokiri Forest' && event.target.id == 'Hyrule Field' && state.currentAge == 'Child' && $.inArray('Gift from Saria', state.checkedLocations) == -1) {
      state.checkedLocations.push('Gift from Saria');
      item = state.testSpoiler['Gift from Saria'];
      state.currentItemsAll.push(item);
      if ($.inArray(item, importantItems) != -1) {
        state.currentItemsImportant.push(item);
      }
      state.numChecksMade++;
      toAppend = '<span>' + 'Gift from Saria' + ($.inArray(item, importantItems) != -1 ? ' (' + item + ')' : '') + '</span><br/>';
      $(toAppend).appendTo('.route');
      $('.lastchecked span').remove();
      $('<span>' + 'Gift from Saria' + ': ' + item + '</span>').appendTo('.lastchecked');
      state.currentRegion = event.target.id;
    }
    else {
      state.currentRegion = event.target.id;
    }
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateForage();
  });
  
  $(document).on('click', '#reset', function(event) {
    state = getInitialState();
    updateForage();
    $('.current a').remove();
    $('.current span').remove();
    $('.current p').remove();
    $('.current br').remove();
    $('.tracker p').remove();
    $('.tracker br').remove();
    $('.tracker a').remove();
    $('.tracker span').remove();
    $('.tracker div').remove();
    $('.medallions div').remove();
    $('.medallions p').remove();
    $('.medallions br').remove();
    $('.route span').remove();
    $('.route br').remove();
    $('.lastchecked span').remove();
    $('#reset').hide();
    $('#files').show();
  });
});
