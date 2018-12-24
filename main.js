var darkModeOn = false;

function getInitialState() {
  return {
    playing: false,

    fsHash: [],

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
    
    obtainedTokens: 0,
  
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

    gossipHints: {},

    knownHints: {},
  };
}

var state = getInitialState();

function getHashImage(item) {
  return (
      {
    'Deku Stick': 'stick.png',
    'Deku Nut': 'nut.png',
    'Bow': 'bow.png',
    'Slingshot': 'slingshot.png',
    'Fairy Ocarina': 'fairyocarina.png',
    'Bombchu': 'bombchu.png',
    'Longshot': 'longshot.png',
    'Boomerang': 'boomerang.png',
    'Lens of Truth': 'lens.png',
    'Beans': 'bean.png',
    'Hammer': 'hammer.png',
    'Bottled Fish': 'unknown-small.png',
    'Bottled Milk': 'unknown-small.png',
    'Mask of Truth': 'truth.png',
    'SOLD OUT': 'unknown-small.png',
    'Cucco': 'cucco.png',
    'Mushroom': 'mushroom.png',
    'Saw': 'saw.png',
    'Frog': 'frog.png',
    'Master Sword': 'sword2.png',
    'Mirror Shield': 'shield3.png',
    'Kokiri Tunic': 'greentunic.png',
    'Hover Boots': 'hoverboots.png',
    'Silver Gauntlets': 'lift2.png',
    'Gold Scale': 'scale2.png',
    'Stone of Agony': 'agony.png',
    'Skull Token': 'skulltula.png',
    'Heart Container': 'unknown-small.png',
    'Boss Key': 'boss_key.png',
    'Compass': 'unknown-small.png',
    'Map': 'unknown-small.png',
    'Big Magic': 'magic2.png',
      }
  )[item];
}

$(function() {  
  
  var drawHeader = function() {
    $('<div class="headerbar noselect"></div><a href="" id="dark-mode-toggle">'+(darkModeOn ? 'Light' : 'Dark')+' Mode</a>').appendTo('body');
    $('<div class="title"><img src="images/ocarina.png" width="50px" height="50px" draggable="false"/></div>').appendTo('.headerbar');
    $('<span>ZooTR Sim</span>').appendTo('.title');
    var hashhtml = '<div class="hash">';
    for (var i = 0; i < state.fsHash.length; i++) {
      hashhtml += '<div class="hash-item" id="' + state.fsHash[i] + '" style="background-image: url(\'images/'+getHashImage(state.fsHash[i])+'\')"></div>';
      console.log(hashhtml);
    }
    hashhtml += '</div>';
    $(hashhtml).appendTo('.headerbar');
    $('<span class="credit">made by scatter</span>').appendTo('.headerbar');
  }
  
  var drawFooter = function() {
    $('<div class="footer"></div>').appendTo('body');
    $('<a href="https://github.com/scattertv/zootr-sim/issues/new">Report an Issue</a>').appendTo('.footer');
  }
  
  var setupPageForPlaying = function() {
    $('div').remove();
    $('a').remove();
    $('br').remove();
    drawHeader();
    var disableUndo = true;
    if (state && state.checkedLocations.length >= 2) {
      disableUndo = false;
    }
    $('<div class="mainbody"><div class="lastchecked"></div><br/>\
    <div class="main tracker"></div>\
    <div class="main current"><div class="currentinner"></div></div>\
    <div class="main hints"></div>\
    <div class="main skulls"><div class="skullsinner"></div></div>\
    <div class="main route"></div><br/>\
    <br/><a class="button' + (disableUndo ? ' disabled-button' : '') + '" id="undo">Undo</a><a class="button" id="reset">This seed sucks, throw it away</a></div>').appendTo('body');
    drawFooter();
  };
  
  var teardownPageForEnd = function() {
    $('div').remove();
    $('a').remove();
    $('br').remove();
    drawHeader();
    $('<div class="mainbody"><div class="start"><span class="header">Upload a spoiler log.</span><br/>\
    <span class="subheader">Only guaranteed to work with tournament logs and some 3.0 logs (more support coming soon).</span><br/><br/>\
    <input type=file id=files /><br/></div></div>').appendTo('body');
    $('#files').on('change', onFilesChanged);
    drawFooter();
  };
  
  localforage.getItem('dark-mode-on', function(err, val) {
    if (val) {
      darkModeOn = val;
    }
    if (darkModeOn) {
      $('body').toggleClass('dark-mode');
    }
  });
  
  teardownPageForEnd();
  
  localforage.getItem('state', function (err, val) {
    if (val && val.playing) {
      state = val;
      setupPageForPlaying();
      localforage.getItem('route', (err, val) => $('.route').html(val));
      updateAccessible();
      updateCollected();
      updateMedallions();
      updateHints();
    }
  });
  
  function onFilesChanged() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = $('#files').get(0);
    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
  };

  function processFile(e) {
      var file = e.target.result,
          results;
      if (file && file.length) {
        try {
          results = file.split("Locations:")[1].split("Playthrough:")[0].split('\n').filter(el => el.trim() != "");
          if (file.includes("File Select Hash:")) {
            state.fsHash = file.split("File Select Hash:")[1].split("Settings")[0].split('\n').filter(el => el.trim() != "").map(el => el.trim());
          }
          hints = [];
          if (file.includes("Death Mountain Crater (Bombable Wall)")) {
            hints = file.split("Gossip Stone Hints:")[1].split('\n').filter(el => el.trim() != "");
          }
          state.totalChecks = results.length;
          for (var i = 0; i < results.length; i++) {
            loc = results[i].split(':')[0].trim();
            item = results[i].split(':')[1].trim();
            state.testSpoiler[loc] = item;
          }
          for (var i = 0; i < hints.length; i++) {
            if (hints[i].split(':')[0] == 'Generic Grotto') {
              state.gossipHints['Generic Grotto'] = hints[i].split(':')[1].trim();
            }
            else {
              region = hints[i].split('(')[0].trim();
              if (region == 'Zoras River') region = 'Zora River';
              stone = hints[i].split('(')[1].split(')')[0].trim();
              hinttext = hints[i].split(':')[1].trim();
              if (!(region in state.gossipHints)) {
                state.gossipHints[region] = {};
              }
              state.gossipHints[region][stone] = hinttext;
            }
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
          state.playing = true;
          setupPageForPlaying();
          updateAccessible();
          updateCollected();
          updateMedallions();
          updateHints();
          $('<span>---- CHILD ' + state.currentChild + ' ----</span><br/><br/>').appendTo('.route');
          updateForage();
        }
        catch(err) {
          console.log(err);
          alert('Error parsing file! Please choose a randomizer spoiler log.');
        }
      }
  }
  

  var updateAccessible = function() {
    $('.currentinner p').remove();
    $('.currentinner a').remove();
    $('.currentinner br').remove();
    $('.currentinner span').remove();
    $('.skullsinner p').remove();
    $('.skullsinner span').remove();
    $('.skullsinner a').remove();
    $('.skullsinner br').remove();
    $('<p>Current Region: ' + state.currentRegion + ' [' + state.currentAge + ']</p>').appendTo('.currentinner');
    locations = state.currentAge == 'Child' ? locationsByRegionChild : locationsByRegionAdult;
    skulltulas = state.currentAge == 'Child' ? skulltulasByRegionChild : skulltulasByRegionAdult;
    entrances = state.currentAge == 'Child' ? entrancesByRegionChild : entrancesByRegionAdult;
    for (var i = 0; i < locations[state.currentRegion].length; i++) {
      key = locations[state.currentRegion][i];
      if ($.inArray(key, state.checkedLocations) == -1) {
        //if (!(key in logicDict) || logicDict[key]()) {
        if (key in state.testSpoiler || key.startsWith('Check Pedestal')) {
          $('<a class="location" id="' + key + '">' + key + '</a><br/>').appendTo('.currentinner');
        }
      }
      else {
        $('<span class="location checked" id="' + key + '">' + key + '</span><br/>').appendTo('.currentinner');
      }
    }
    if (locations[state.currentRegion].length > 0) {
      $('<br/>').appendTo('.currentinner');
    }
    for (var i = 0; i < entrances[state.currentRegion].length; i++) {
      key = entrances[state.currentRegion][i];
    //  if (!(key in logicDict) || logicDict[key]()) {
      if (true) {
        $('<a class="entrance" id="' + key + '">To ' + key + '</a><br/>').appendTo('.currentinner');
      }
    }
    collectedWarps = state.currentItemsAll.filter(value => -1 !== warpSongs.indexOf(value));
    for (var i = 0; i < collectedWarps.length; i++)
    {
      if (i == 0) {
        $('<p>WARPS</p>').appendTo('.currentinner');
      }
      $('<a class="entrance" id="' + collectedWarps[i] + '">Play ' + collectedWarps[i] + '</a><br/>').appendTo('.currentinner');
    }
    $('<br/><a class="entrance" id="Savewarp ' + state.currentAge  + '">Savewarp to ' + (state.currentAge == 'Child' ? 'Kokiri Forest' : 'Temple of Time') + '</a><br/>').appendTo('.currentinner');
    $('<p>Gold Skulltulas ['+(state.currentItemsAll.filter((x) => x == 'Gold Skulltula Token').length)+'/100]</p>').appendTo('.skullsinner');
    for (var i = 0; i < skulltulas[state.currentRegion].length; i++) {
      key = skulltulas[state.currentRegion][i];
      if ($.inArray(key, state.checkedLocations) == -1) {
        $('<a class="location" id="' + key + '">' + key + '</a><br/>').appendTo('.skullsinner');
      }
      else {
        $('<span class="location checked" id="' + key + '">' + key + '</span><br/>').appendTo('.skullsinner');
      }
    }
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

  var updateHints = function() {
    $('.hints p').remove();
    $('.hints span').remove();
    $('.hints br').remove();
    $('.hints a').remove();
    $('<span>AVAILABLE HINTS</span><br/><br/>').appendTo('.hints');
    if (!('Kokiri Forest' in state.gossipHints)) {
      $('<span>Hints unavailable! Use a log from a newer version to access them.</span><br/><br/>').appendTo('.hints');
    }
    else if (state.currentRegion in state.gossipHints) {
      if (!('Generic Grotto' in state.knownHints)) {
        $('<a class="hint" id="Generic Grotto">Generic Grotto</span><br/>').appendTo('.hints');
      }
      else {
        $('<span class="hint checked" id="Generic Grotto">Generic Grotto</span><br/>').appendTo('.hints');
      }
      for (stone in state.gossipHints[state.currentRegion]) {
        if (!((state.currentRegion + ' ' + stone) in state.knownHints)) {
          $('<a class="hint" id="'+stone+'">'+stone+'</span><br/>').appendTo('.hints');
        }
        else {
          $('<span class="hint checked">'+stone+'</span><br/>').appendTo('.hints');
        }
      }
      $('<br/>').appendTo('.hints');
    }
    $('<span>CHECKED HINTS</span><br/><br/>').appendTo('.hints');
    for (stone in state.knownHints) {
      $('<span>'+stone+': '+state.knownHints[stone]+'</span><br/>').appendTo('.hints');
    }
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
  
  $(document).on('mousedown', 'a', function(e) {
    e.preventDefault();
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
            state.knownMedallions[key] = state.medallions[key];
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
    else if (!(event.target.id in state.testSpoiler) && event.target.id.startsWith('GS ')) {
      state.currentItemsAll.push('Gold Skulltula Token');
      state.checkedLocations.push(event.target.id);
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
    
    if (state.checkedLocations.length >= 2) {
      $('#undo').attr('class', 'button');
    }
    
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateHints();
    updateForage();
  });

  $(document).on('click', 'a.hint', function(event) {
    stone = event.target.id;
    if (stone == 'Generic Grotto') {
      state.knownHints['Generic Grotto'] = state.gossipHints['Generic Grotto'];
    }
    else {
      state.knownHints[state.currentRegion + ' ' + stone] = state.gossipHints[state.currentRegion][stone];
    }
    updateHints();
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
      if ('Gift from Saria' in state.testSpoiler) {
        item = state.testSpoiler['Gift from Saria'];
      }
      else {
        item = 'Ocarina';
      }
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
    updateHints();
    updateForage();
  });
  
  $(document).on('click', '#undo', function(event) {
    if (state.checkedLocations.length >= 2) {
      lastCheckedLocation = state.checkedLocations.pop();
      if (lastCheckedLocation in state.testSpoiler) {
        state.currentItemsAll.splice(state.currentItemsAll.lastIndexOf(state.testSpoiler[lastCheckedLocation]));
        state.numChecksMade--;
      }
      else if (lastCheckedLocation.startsWith('GS ')) {
        state.currentItemsAll.splice(state.currentItemsAll.lastIndexOf('Gold Skulltula Token'));
      }
      $($('.route span').get().reverse()).each(function() {
        if ($(this).text().includes(lastCheckedLocation)) {
          $(this).css('text-decoration', 'line-through');
          return false;
        }
      });
      if (state.checkedLocations.length <= 1) {
        $('#undo').attr('class', 'button disabled-button');
      }
      else {
        $('#undo').attr('class', 'button');
      }
      updateAccessible();
      updateCollected();
      updateForage();
    }
  });
  
  $(document).on('click', '#reset', function(event) {
    state = getInitialState();
    updateForage();
    teardownPageForEnd();
  });
  
  $(document).on('click', '#dark-mode-toggle', function(event) {
    event.preventDefault();
    
    $('body').toggleClass('dark-mode');
    if ($('body').hasClass('dark-mode')) {
      $('#dark-mode-toggle').text('Light Mode');
      darkModeOn = true;
    }
    else {
      $('#dark-mode-toggle').text('Dark Mode');
      darkModeOn = false;
    }
    localforage.setItem('dark-mode-on', darkModeOn);
  });
});
