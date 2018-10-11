var playing = false;
var currentRegion = 'Kokiri Forest';
var currentChild = 1;
var currentAdult = 0;
var currentAge = 'Child';
var currentItemsAll = {};
var currentItemsImportant = [];
var numChecksMade = 0;
var totalChecks = 0;
var testSpoiler = {};
var setFlags = [];
var medallions = {};
var lighthint = '';
var knownMedallions = {
  'Deku Tree': '???',
  'Dodongos Cavern': '???',
  'Jabu Jabus Belly': '???',
  'Forest Temple': '???',
  'Fire Temple': '???',
  'Water Temple': '???',
  'Shadow Temple': '???',
  'Spirit Temple': '???',
  'Free': '???',
};
var checkedLocations = [];

$(function() {  
  
  localforage.getItem('playing', function (err, val) {
    playing = val;
    if (val) {
      localforage.getItem('currentRegion', (err, val) => { currentRegion = val; updateAccessible(); });
      localforage.getItem('currentChild', (err, val) => currentChild = val);
      localforage.getItem('currentAdult', (err, val) => currentAdult = val);
      localforage.getItem('currentAge', (err, val) => { currentAge = val; updateAccessible(); });
      localforage.getItem('currentItemsAll', (err,val) => currentItemsAll = val);
      localforage.getItem('currentItemsImportant', (err, val) => { currentItemsImportant = val; updateAccessible(); updateCollected(); updateMedallions(); });
      localforage.getItem('spoiler', (err, val) => testSpoiler = val);
      localforage.getItem('medallions', (err, val) => medallions = val);
      localforage.getItem('lighthint', (err, val) => lighthint = val);
      localforage.getItem('knownMedallions', (err, val) => { knownMedallions = val; updateMedallions() });
      localforage.getItem('checkedLocations', (err, val) => { checkedLocations = val; updateAccessible() });
      localforage.getItem('numChecksMade', (err, val) => { numChecksMade = val; updateCollected(); });
      localforage.getItem('totalChecks', (err, val) => { totalChecks = val; updateCollected(); });
      localforage.getItem('route', (err, val) => $('.route').html(val));
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
          totalChecks = results.length;
          for (var i = 0; i < results.length; i++) {
            loc = results[i].split(':')[0].trim();
            item = results[i].split(':')[1].trim();
            testSpoiler[loc] = item;
          }
          checkedLocations.push('Links Pocket');
          currentItemsAll[testSpoiler['Links Pocket']] = 1;
          numChecksMade++;
          knownMedallions['Free'] = testSpoiler['Links Pocket'];
          medallions['Free'] = testSpoiler['Links Pocket'];
          medallions['Deku Tree'] = testSpoiler['Queen Gohma'];
          medallions['Dodongos Cavern'] = testSpoiler['King Dodongo'];
          medallions['Jabu Jabus Belly'] = testSpoiler['Barinade'];
          medallions['Forest Temple'] = testSpoiler['Phantom Ganon'];
          medallions['Fire Temple'] = testSpoiler['Volvagia'];
          medallions['Water Temple'] = testSpoiler['Morpha'];
          medallions['Shadow Temple'] = testSpoiler['Bongo Bongo'];
          medallions['Spirit Temple'] = testSpoiler['Twinrova'];
          $('<span>---- CHILD ' + currentChild + ' ----</span><br/><br/>').appendTo('.route');
          playing = true;
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
    $('<p>Current Region: ' + currentRegion + ' [' + currentAge + ']</p>').appendTo('.current');
    locations = currentAge == 'Child' ? locationsByRegionChild : locationsByRegionAdult;
    utility = currentAge == 'Child' ? utilityByRegionChild : utilityByRegionAdult;
    entrances = currentAge == 'Child' ? entrancesByRegionChild : entrancesByRegionAdult;
    for (var i = 0; i < locations[currentRegion].length; i++) {
      key = locations[currentRegion][i];
      if ($.inArray(key, checkedLocations) == -1) {
        $('<a class="location" id="' + key + '">' + key + '</a><br/>').appendTo('.current');
      }
      else {
        $('<span class="location checked" id="' + key + '">' + key + '</span><br/>').appendTo('.current');
      }
    }
    if (locations[currentRegion].length > 0) {
      $('<br/>').appendTo('.current');
    }
    if (currentRegion in utility) {
      var showedUtilities = false;
      for (var i = 0; i < utility[currentRegion].length; i++) {
        key = utility[currentRegion][i];
        if (utilityLogicDict[key]() && ($.inArray(key,setFlags) == -1)) {
          showedUtilities = true;
          $('<a class="utility" id="' + key + '">' + key + '</a><br/>').appendTo('.current');
        }
      }
      if (showedUtilities) {
        $('<br/>').appendTo('.current');
      }
    }
    for (var i = 0; i < entrances[currentRegion].length; i++) {
      key = entrances[currentRegion][i];
    //  if (!(key in logicDict) || logicDict[key]()) {
      if (true) {
        $('<a class="entrance" id="' + key + '">To ' + key + '</a><br/>').appendTo('.current');
      }
    }
    collectedWarps = warpSongs.filter(value => value in currentItemsAll);
    for (var i = 0; i < collectedWarps.length; i++)
    {
      if (i == 0) {
        $('<p>WARPS</p>').appendTo('.current');
      }
      $('<a class="entrance" id="' + collectedWarps[i] + '">Play ' + collectedWarps[i] + '</a><br/>').appendTo('.current');
    }
    $('<br/><a class="entrance" id="Savewarp ' + currentAge  + '">Savewarp to ' + (currentAge == 'Child' ? 'Kokiri Forest' : 'Temple of Time') + '</a><br/>').appendTo('.current');
  };
  
  var updateCollected = function() {
    $('.tracker span').remove();
    $('.tracker br').remove();
    $('.tracker div').remove();
    $('<div class="items"></div>').appendTo('.tracker');
    drawItems();
    $('<div class="dungeons"></div>').appendTo('.tracker');
    drawDungeons();
    $('<br/><br/><span>' + numChecksMade + '/' + totalChecks + ' checks made</span><br/><br/>').appendTo('.tracker');
    if (lighthint != '') {
      $('<span>Light Arrows Hint: ' + lighthint + '</span>').appendTo('.tracker');
    }
  };
  
  var updateMedallions = function() {
    $('.medallions p').remove();
    $('.medallions div').remove();
    $('.medallions br').remove();
    //drawDungeons();
  };
  
  var updateForage = function() {
    localforage.setItem('playing', playing);
    localforage.setItem('currentRegion', currentRegion);
    localforage.setItem('currentChild', currentChild);
    localforage.setItem('currentAdult', currentAdult);
    localforage.setItem('currentAge', currentAge);
    localforage.setItem('currentItemsAll', currentItemsAll);
    localforage.setItem('currentItemsImportant', currentItemsImportant);
    localforage.setItem('spoiler', testSpoiler);
    localforage.setItem('medallions', medallions);
    localforage.setItem('knownMedallions', knownMedallions);
    localforage.setItem('checkedLocations', checkedLocations);
    localforage.setItem('numChecksMade', numChecksMade);
    localforage.setItem('totalChecks', totalChecks);
    localforage.setItem('lighthint', lighthint);
    localforage.setItem('route', $('.route').html());
  };
  
  $(document).on('mousedown', 'a', function(e) {
    e.preventDefault();
  });
  
  $(document).on('click', 'a.location', function(event) {
    if (event.target.id.startsWith('Check Pedestal')) {
      checkedLocations.push(event.target.id);
      if (currentAge == 'Adult') {
        checkedLocations.push('Check Pedestal (Stones)');
      }
      for (var key in medallions) {
        if (!(medallions[key] in currentItemsAll)) {
          if (medallions[key].includes('Medallion')) {
            if (currentAge == 'Adult') {
              knownMedallions[key] = medallions[key];
            }
          }
          else {
            knownMedallions[key] = medallions[key];
          }
        }
      }
    }
    else if (event.target.id == 'Light Arrows Hint') {
      checkedLocations.push(event.target.id);
      lightlocation = Object.keys(testSpoiler).find(key => testSpoiler[key] === 'Light Arrows');
      lighthint = Object.keys(locationsByRegionAdult).find(key => $.inArray(lightlocation, locationsByRegionAdult[key]) != -1);
      $('<span>Light Arrows Hint ('+lighthint+')</span><br/>').appendTo('.route');
    }
    else if (event.target.id == 'Ganon') {
      if ('Light Arrows' in currentItemsAll) {
        $('.lastchecked span').remove();
        $('<span>Not without Light Arrows!</span>').appendTo('.lastchecked');
      }
      else {
        $('.lastchecked span').remove();
        $('<span>Congratulations!</span>').appendTo('.lastchecked');
        $('<span>Ganon (Triforce)</span><br/><br/>').appendTo('.route');
        $('<span>Total Checks Made: '+numChecksMade+'/'+totalChecks+'</span><br/>').appendTo('.route');
      }
    }
    else
    {
      key = event.target.id;
      if (!(key in locationLogicDict) || locationLogicDict[key]())
      {
        numChecksMade++;
        if (event.target.id in bosses) {
          knownMedallions[bosses[event.target.id]] = testSpoiler[event.target.id];
        }
        if (event.target.id == 'Impa at Castle') {
          currentItemsAll['Zeldas Letter'] = 1;
        }
        checkedLocations.push(event.target.id);
        item = testSpoiler[event.target.id];
        if (item in currentItemsAll) {
          currentItemsAll[item]++;
        }
        else {
          currentItemsAll[item] = 1;
        }
        
        if ($.inArray(item, importantItems) != -1) {
          currentItemsImportant.push(item);
        }
        toAppend = '<span>' + event.target.id + ($.inArray(item, importantItems) != -1 ? ' (' + item + ')' : '') + '</span><br/>';
        $(toAppend).appendTo('.route');
        $('.lastchecked span').remove();
        $('<span>' + event.target.id + ': ' + item + '</span>').appendTo('.lastchecked');
        if (event.target.id in regionChangingChecks) {
          currentRegion = regionChangingChecks[event.target.id];
        }
      }
      else {
        $('.lastchecked span').remove();
        $('<span>Not possible with current items!</span>').appendTo('.lastchecked');
        var selector = 'a[id="'+event.target.id+'"]';
        var el = $(selector);
  	    el.addClass('red');
        el.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
          el.removeClass('red');
        })
        return;
      }
    }
    
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateForage();
  });
  
  $(document).on('click', 'a.utility', function(event) {
    setFlags.push(event.target.id);
    utilityLambdas[event.target.id]();
    $('<span>'+event.target.id+'</span><br/>').appendTo('.route');
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateForage();
  });
  
  $(document).on('click', 'a.entrance', function(event) {
    if (event.target.id == 'Pull Master Sword') {
      currentAdult++;
      $('<br/><span>---- ADULT ' + currentAdult + ' ----</span><br/><br/>').appendTo('.route');
      currentAge = 'Adult';
    }
    else if (event.target.id == 'Place Master Sword') {
      currentChild++;
      $('<br/><span>---- CHILD ' + currentChild + ' ----</span><br/><br/>').appendTo('.route');
      currentAge = 'Child';
    }
    else if (event.target.id == 'Savewarp Child') {
      currentRegion = 'Kokiri Forest';
      $('<span>Savewarp</span><br/>').appendTo('.route');
    }
    else if (event.target.id == 'Savewarp Adult') {
      currentRegion = 'Temple of Time';
      $('<span>Savewarp</span><br/>').appendTo('.route');
    }
    else if (event.target.id in songTargets) {
      currentRegion = songTargets[event.target.id];
      $('<span>Play '+event.target.id+'</span><br/>').appendTo('.route');
    }
    else if (currentRegion == 'Kokiri Forest' && event.target.id == 'Hyrule Field' && currentAge == 'Child' && $.inArray('Gift from Saria', checkedLocations) == -1) {
      checkedLocations.push('Gift from Saria');
      item = testSpoiler['Gift from Saria'];
      if (item in currentItemsAll) {
        currentItemsAll[item]++;
      }
      else {
        currentItemsAll[item] = 1;
      }
      if ($.inArray(item, importantItems) != -1) {
        currentItemsImportant.push(item);
      }
      numChecksMade++;
      toAppend = '<span>' + 'Gift from Saria' + ($.inArray(item, importantItems) != -1 ? ' (' + item + ')' : '') + '</span><br/>';
      $(toAppend).appendTo('.route');
      $('.lastchecked span').remove();
      $('<span>' + 'Gift from Saria' + ': ' + item + '</span>').appendTo('.lastchecked');
      currentRegion = event.target.id;
    }
    else {
      currentRegion = event.target.id;
    }
    updateAccessible();
    updateCollected();
    updateMedallions();
    updateForage();
  });
  
  $('a').on('webkitAnimationEnd oanimationend msAnimationEnd animationend webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(event) {
    console.log('a');
  	$('a[id="'+event.target.id+'"]').removeClass("red");
  }); 
  
  $(document).on('click', '#reset', function(event) {
    currentRegion = 'Kokiri Forest';
    currentChild = 1;
    currentAdult = 0;
    currentAge = 'Child';
    currentItemsAll = {};
    currentItemsImportant = [];
    testSpoiler = {};
    medallions = {};
    knownMedallions = {
      'Deku Tree': '???',
      'Dodongos Cavern': '???',
      'Jabu Jabus Belly': '???',
      'Forest Temple': '???',
      'Fire Temple': '???',
      'Water Temple': '???',
      'Shadow Temple': '???',
      'Spirit Temple': '???',
      'Free': '???',
    };
    checkedLocations = [];
    numChecksMade = 0;
    totalChecks = 0;
    playing = false;
    lighthint = '';
    updateForage();
    $('.current a').remove();
    $('.current span').remove();
    $('.current p').remove();
    $('.current br').remove();
    $('.tracker p').remove();
    $('.tracker br').remove();
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