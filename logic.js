function has(item) {
  ret = $.inArray(item, currentItems);
  return $.inArray(item, currentItems) != -1;
}

function has_ocarina() {
  return has('Ocarina') || has('Fairy Ocarina') || has('Ocarina of Time');
}

function can_play(song) {
  return has(song) && has_ocarina();
}

function has_fire_source() {
  return ((has('Dins Fire') || (has('Bow') && has('Fire Arrows') && is_adult())) && has('Magic Meter'))
}

function is_adult() {
  return true;
}

function nighttime() {
  return true;
}

function can_see_with_lens() {
  return true;
}

function has_explosives() {
  return has('Bomb Bag');
}

function guarantee_hint() {
  return true;
}

function has_bombchus() {
  return false;
}

function can_blast_or_smash() {
  return has('Bomb Bag') || (is_adult() && has('Hammer')) || has_bombchus();
}

function has_bottle() {
  return true;
}

function can_reach(loc) {
  return true;
}

function can_dive() {
  return has('Progressive Scale');
}

function can_finish_adult_trades() {
  zora_thawed = has_bottle() && has('Zeldas Lullaby') && (can_reach('Ice Cavern') || can_reach('Ganons Castle Water Trial') || has('Progressive Wallet', 2));
  carpenter_access = has('Epona') || has('Progressive Hookshot', 2);
  return (has('Claim Check') || ((has('Eyedrops') || has('Eyeball Frog') || has('Prescription') || has('Broken Sword')) && zora_thawed) || ((has('Poachers Saw') || has('Odd Mushroom') || has('Cojiro') || has('Pocket Cucco') || has('Pocket Egg')) && zora_thawed && carpenter_access));
}

var logicDict = {
    'Skull Kid': () => { return can_play('Sarias Song') },
    'Ocarina Memory Game': () => { return has_ocarina() },
    'Target in Woods': () => { return has('Slingshot') },
    'Deku Theater Skull Mask': () => { return has('Zeldas Letter') },
    'Deku Theater Mask of Truth': () => { return (has('Zeldas Letter') && can_play('Sarias Song') && has('Kokiri Emerald') && has('Goron Ruby') && has('Zora Sapphire') && guarantee_hint()) }, 
    'Anju as Adult': () => { return is_adult() },
    '10 Gold Skulltulla Reward': () => { return has('Gold Skulltulla Token', 10) },
    '20 Gold Skulltulla Reward': () => { return has('Gold Skulltulla Token', 20) },
    '30 Gold Skulltulla Reward': () => { return has('Gold Skulltulla Token', 30) },
    '40 Gold Skulltulla Reward': () => { return has('Gold Skulltulla Token', 40) },
    '50 Gold Skulltulla Reward': () => { return has('Gold Skulltulla Token', 50) },
    'Heart Piece Grave Chest': () => { return can_play('Suns Song') },
    'Composer Grave Chest': () => { return has_fire_source() },  
    'Bottom of the Well Front Left Hidden Wall': () => { return can_see_with_lens() },
    'Bottom of the Well Front Center Bombable': () => { return has_explosives() },
    'Bottom of the Well Right Bottom Hidden Wall': () => { return can_see_with_lens() },
    'Bottom of the Well Center Large Chest': () => { return can_see_with_lens() },
    'Bottom of the Well Center Small Chest': () => { return can_see_with_lens() },
    'Bottom of the Well Back Left Bombable': () => { return has_explosives() },
    'Bottom of the Well Defeat Boss': () => { return can_play('Zeldas Lullaby') },
    'Bottom of the Well Invisible Chest': () => { return can_play('Zeldas Lullaby') && can_see_with_lens() },
    'Bottom of the Well Underwater Front Chest': () => { return can_play('Zeldas Lullaby') },
    'Bottom of the Well Underwater Left Chest': () => { return can_play('Zeldas Lullaby') },
    'Bottom of the Well Basement Chest': () => { return has_explosives() },
    'Bottom of the Well Locked Pits': () => { return has('Small Key (Bottom of the Well)', 3) && can_see_with_lens() }, 
    'Bottom of the Well Behind Right Grate': () => { return has('Small Key (Bottom of the Well)', 3) && can_see_with_lens() },  
    'Death Mountain Bombable Chest': () => { return can_blast_or_smash() },
    'Biggoron': () => { return (can_blast_or_smash() && is_adult() && can_finish_adult_trades() && guarantee_hint()) },
    'Goron City Leftmost Maze Chest': () => { return is_adult() && (has('Progressive Strength Upgrade', 2) || has('Hammer')) },
    'Goron City Left Maze Chest': () => { return can_blast_or_smash() || (has('Progressive Strength Upgrade', 2) && is_adult()) },
    'Goron City Right Maze Chest': () => { return can_blast_or_smash() || (has('Progressive Strength Upgrade', 2) && is_adult()) },
    'Rolling Goron as Child': () => { return has('Bomb Bag') },
    'Goron City Pot Freestanding PoH': () => { return (has('Bomb Bag') || has('Progressive Strength Upgrade')) && (can_play('Zeldas Lullaby') || (has('Dins Fire') && has('Magic Meter'))) },
    'Darunias Joy': () => { return can_play('Sarias Song') },
    'Dodongos Cavern End of Bridge Chest': () => { return has_explosives() || (is_adult() && has('Hammer')) },
    'King Dodongo': () => { return has('Bomb Bag') || has('Progressive Strength Upgrade') },
    'King Dodongo Heart': () => { return has('Bomb Bag') || has('Progressive Strength Upgrade') },
    'Song from Saria': () => { return has('Zeldas Letter') },
    'Crater Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Mountain Summit Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Hyrule Castle Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Ganons Castle Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Bombchu Bowling Bomb Bag': () => { return has_bombchus() },
    'Bombchu Bowling Piece of Heart': () => { return has_bombchus() },
    'Adult Shooting Gallery': () => { return has('Bow') && is_adult() },
    '10 Big Poes': () => { return (has('Bow') && has('Epona') && has_bottle() && is_adult() && guarantee_hint()) },
    'Treasure Chest Game': () => { return has('Lens of Truth') && has('Magic Meter') },
    'Zora River Lower Freestanding PoH': () => { return has_explosives() || has('Progressive Scale') || (has('Hover Boots') && is_adult()) },
    'Zora River Upper Freestanding PoH': () => { return has_explosives() || has('Progressive Scale') || (has('Hover Boots') && is_adult()) },
    'Frog Ocarina Game': () => { return can_play('Zeldas Lullaby') && can_play('Sarias Song') && can_play('Suns Song') && can_play('Eponas Song') && can_play('Song of Time') && can_play('Song of Storms') },
    'Frogs in the Rain': () => { return can_play('Song of Storms') },
    'Underwater Bottle': () => { return can_dive() },
    'King Zora Moves': () => { return has('Bottle with Letter') },
    'Zoras Fountain Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Ice Cavern Map Chest': () => { return has_bottle() },
    'Ice Cavern Compass Chest': () => { return has_bottle() },
    'Ice Cavern Freestanding PoH': () => { return has_bottle() },
    'Ice Cavern Iron Boots Chest': () => { return has_bottle() },
    'Sheik in Ice Cavern': () => { return has_bottle() && is_adult() },
    'Ocarina of Time': () => { return has('Kokiri Emerald') && has('Goron Ruby') && has('Zora Sapphire') && guarantee_hint() },
    'Song from Ocarina of Time': () => { return has('Kokiri Emerald') && has('Goron Ruby') && has('Zora Sapphire') && guarantee_hint() },
    'Talons Chickens': () => { return has('Zeldas Letter') },
    'Song from Malon': () => { return has('Zeldas Letter') && has_ocarina() },
    'Epona': () => { return can_play('Eponas Song') && is_adult() },
    'Forest Temple Block Push Chest': () => { return has('Bow') && is_adult() },
    'Forest Temple Red Poe Chest': () => { return has('Bow') && is_adult() },
    'Forest Temple Blue Poe Chest': () => { return has('Bow') && is_adult() },
    'Phantom Ganon': () => { return has('Boss Key (Forest Temple)') },
    'Phantom Ganon Heart': () => { return has('Boss Key (Forest Temple)') },
    'Graveyard Freestanding PoH': () => { return is_adult() && (has('Magic Bean') || has('Progressive Hookshot', 2)) },
    'Song at Windmill': () => { return is_adult() && has_ocarina() },
    'Windmill Freestanding PoH': () => { return (is_adult()) || has('Boomerang') },
    'Sheik at Temple': () => { return has('Forest Medallion') && is_adult() },
    'Diving in the Lab': () => { return has('Progressive Scale', 2) },
    'Child Fishing': () => { return has('Kokiri Sword') },
    'Adult Fishing': () => { return (is_adult() && ((has('Progressive Hookshot') && has_ocarina()) || has('Magic Bean'))) },
    'Lake Hylia Freestanding PoH': () => { return is_adult() && ((has('Progressive Hookshot') && has_ocarina()) || has('Magic Bean')) },
    'Lake Hylia Sun': () => { return ((has('Progressive Hookshot', 2) && has_ocarina()) || can_reach('Morpha')) && has('Bow') && is_adult() },
    'DM Crater Volcano Freestanding PoH': () => { return is_adult() && has('Magic Bean') && can_play('Bolero of Fire') },
    'Fire Temple Fire Dancer Chest': () => { return is_adult() && has('Hammer') },
    'Fire Temple Boss Key Chest': () => { return is_adult() && has('Hammer') },
    'Fire Temple Big Lava Room Bombable Chest': () => { return has('Small Key (Fire Temple)', 1) && has_explosives() },
    'Fire Temple Big Lava Room Open Chest': () => { return has('Small Key (Fire Temple)', 1) },
    'Fire Temple Map Chest': () => { return has('Small Key (Fire Temple)', 5) || (has('Small Key (Fire Temple)', 4) && is_adult() && has('Bow')) },
    'Fire Temple Boulder Maze Upper Chest': () => { return has('Small Key (Fire Temple)', 5) },
    'Fire Temple Boulder Maze Bombable Pit': () => { return has('Small Key (Fire Temple)', 5) && has_explosives() },
    'Fire Temple Scarecrow Chest': () => { return has_ocarina() && has('Small Key (Fire Temple)', 5) && has('Progressive Hookshot') && is_adult() },
    'Fire Temple Compass Chest': () => { return has('Small Key (Fire Temple)', 6) },
    'Fire Temple Highest Goron Chest': () => { return can_play('Song of Time') && has('Hammer') && is_adult() },
    'Fire Temple Megaton Hammer Chest': () => { return has_explosives() },
    'Volvagia': () => { return has('Hammer') && is_adult() && has('Boss Key (Fire Temple)') && (has('Hover Boots') || (can_reach('Fire Temple Upper') && (can_play('Song of Time') || has_explosives()))) },
    'Volvagia Heart': () => { return has('Hammer') && is_adult() && has('Boss Key (Fire Temple)') && (has('Hover Boots') || (can_reach('Fire Temple Upper') && (can_play('Song of Time') || has_explosives()))) },
    'Sheik in Crater': () => { return is_adult() },
    'Link the Goron': () => { return is_adult() && (has('Progressive Strength Upgrade') || has_explosives() || has('Bow')) },
    'King Zora Thawed': () => { return has_bottle() && (can_reach('Ice Cavern') || can_reach('Ganons Castle Water Trial') || has('Progressive Wallet', 2)) },
    'Zoras Fountain Bottom Freestanding PoH': () => { return has('Iron Boots') },
    'Water Temple Torches Chest': () => { return (has('Bow') || (has('Dins Fire') && has('Magic Meter'))) && can_play('Zeldas Lullaby') },
    'Water Temple Dragon Chest': () => { return (has('Progressive Strength Upgrade') && can_play('Zeldas Lullaby')) || (has('Small Key (Water Temple)', 6) && (can_play('Zeldas Lullaby')) && can_play('Song of Time') && has('Bow')) },
    'Water Temple Central Bow Target Chest': () => { return has('Bow') && has('Progressive Strength Upgrade') && can_play('Zeldas Lullaby') && (has('Hover Boots') || has('Progressive Hookshot', 2)) },
    'Water Temple Boss Key Chest': () => { return (has('Small Key (Water Temple)', 6) && (can_play('Zeldas Lullaby')) && ((has_explosives() && has('Progressive Strength Upgrade')) || has('Hover Boots')) && has('Progressive Hookshot', 2)) }, 
    'Morpha': () => { return has('Boss Key (Water Temple)') && has('Progressive Hookshot', 2) },
    'Morpha Heart': () => { return has('Boss Key (Water Temple)') && has('Progressive Hookshot', 2) },
    'Water Temple Cracked Wall Chest': () => { return has_explosives() },
    'Water Temple Dark Link Chest': () => { return has('Small Key (Water Temple)', 6) && (can_play('Zeldas Lullaby')) },
    'Water Temple River Chest': () => { return has('Small Key (Water Temple)', 6) && can_play('Song of Time') && has('Bow') && (can_play('Zeldas Lullaby')) },
    'Sheik in Kakariko': () => { return is_adult() && has('Forest Medallion') && has('Fire Medallion') && has('Water Medallion') },
    'Shadow Temple Falling Spikes Upper Chest': () => { return has('Progressive Strength Upgrade') },
    'Shadow Temple Falling Spikes Switch Chest': () => { return has('Progressive Strength Upgrade') },
    'Shadow Temple Invisible Spikes Chest': () => { return has('Small Key (Shadow Temple)', 2) },
    'Shadow Temple Freestanding Key': () => { return has('Small Key (Shadow Temple)', 2) && has('Progressive Hookshot') },
    'Bongo Bongo': () => { return has('Small Key (Shadow Temple)', 5) && (has('Bow') || has('Progressive Hookshot', 2)) && has('Boss Key (Shadow Temple)') },
    'Bongo Bongo Heart': () => { return has('Small Key (Shadow Temple)', 5) && (has('Bow') || has('Progressive Hookshot', 2)) && has('Boss Key (Shadow Temple)') },
    'Gerudo Valley Hammer Rocks Chest': () => { return has('Hammer') && is_adult() },
    'Colossus Freestanding PoH': () => { return can_play('Requiem of Spirit') && has('Magic Bean') && is_adult() },
    'Desert Colossus Fairy Reward': () => { return can_play('Zeldas Lullaby') },
    'Gerudo Fortress Rooftop Chest': () => { return (has('Hover Boots') || (has('Progressive Hookshot') && has_ocarina()) || (has('Progressive Hookshot', 2))) && is_adult() },
    'Horseback Archery 1000 Points': () => { return has('Gerudo Membership Card') && has('Epona') && has('Bow') && is_adult() },
    'Horseback Archery 1500 Points': () => { return (has('Gerudo Membership Card') && has('Epona') && has('Bow') && is_adult()) },
    'Haunted Wasteland Structure Chest': () => { return has_fire_source() },
    'Gerudo Training Grounds Lobby Left Chest': () => { return has('Bow') && is_adult() },
    'Gerudo Training Grounds Lobby Right Chest': () => { return has('Bow') && is_adult() },
    'Gerudo Training Grounds Beamos Chest': () => { return has_explosives() },
    'Gerudo Training Grounds Hidden Ceiling Chest': () => { return has('Small Key (Gerudo Training Grounds)', 3) && can_see_with_lens() },
    'Gerudo Training Grounds Maze Path First Chest': () => { return has('Small Key (Gerudo Training Grounds)', 4) },
    'Gerudo Training Grounds Maze Path Second Chest': () => { return has('Small Key (Gerudo Training Grounds)', 6) },
    'Gerudo Training Grounds Maze Path Third Chest': () => { return has('Small Key (Gerudo Training Grounds)', 7) },
    'Gerudo Training Grounds Maze Path Final Chest': () => { return (has('Small Key (Gerudo Training Grounds)', 9)) },
    'Gerudo Training Grounds Underwater Silver Rupee Chest': () => { return has('Progressive Hookshot') && can_play('Song of Time') && has('Iron Boots') && is_adult() },
    'Gerudo Training Grounds Hammer Room Switch Chest': () => { return has('Hammer') && is_adult() },
    'Gerudo Training Grounds Eye Statue Chest': () => { return has('Bow') && is_adult() },
    'Gerudo Training Grounds Near Scarecrow Chest': () => { return has('Bow') && is_adult() },
    'Gerudo Training Grounds Heavy Block First Chest': () => { return has('Progressive Strength Upgrade', 2) && can_see_with_lens() && is_adult() },
    'Gerudo Training Grounds Heavy Block Second Chest': () => { return has('Progressive Strength Upgrade', 2) && can_see_with_lens() && is_adult() },
    'Gerudo Training Grounds Heavy Block Third Chest': () => { return has('Progressive Strength Upgrade', 2) && can_see_with_lens() && is_adult() },
    'Gerudo Training Grounds Heavy Block Fourth Chest': () => { return has('Progressive Strength Upgrade', 2) && can_see_with_lens() && is_adult() },
    'Spirit Temple Child Left Chest': () => { return has('Boomerang') || has('Slingshot') },
    'Spirit Temple Child Right Chest': () => { return has('Boomerang') || has('Slingshot') },
    'Spirit Temple Compass Chest': () => { return has('Progressive Hookshot') && can_play('Zeldas Lullaby') },
    'Spirit Temple Early Adult Right Chest': () => { return has('Bow') || has('Progressive Hookshot') || has_bombchus() }, 
    'Spirit Temple First Mirror Right Chest': () => { return has('Small Key (Spirit Temple)', 3) },
    'Spirit Temple First Mirror Left Chest': () => { return has('Small Key (Spirit Temple)', 3) },
    'Spirit Temple Map Chest': () => { return (has('Small Key (Spirit Temple)', 5) && can_play('Requiem of Spirit')) || (has('Magic Meter') && (has('Dins Fire') || (has('Fire Arrows') && has('Bow') && has('Progressive Strength Upgrade', 2) && has('Small Key (Spirit Temple)', 3) && is_adult()))) },
    'Spirit Temple Child Climb East Chest': () => { return has_explosives() || ((has('Boomerang') || has('Slingshot')) && (has('Progressive Hookshot') || has('Bow'))) || (has('Small Key (Spirit Temple)', 3) && has('Progressive Strength Upgrade', 2) && is_adult() && (has('Progressive Hookshot') || has('Bow'))) || (has('Small Key (Spirit Temple)', 5) && can_play('Requiem of Spirit') && (has('Boomerang') || has('Slingshot'))) },
    'Spirit Temple Child Climb North Chest': () => { return has_explosives() || ((has('Boomerang') || has('Slingshot')) && (has('Progressive Hookshot') || has('Bow'))) || (has('Small Key (Spirit Temple)', 3) && has('Progressive Strength Upgrade', 2) && is_adult() && (has('Progressive Hookshot') || has('Bow'))) || (has('Small Key (Spirit Temple)', 5) && can_play('Requiem of Spirit') && (has('Boomerang') || has('Slingshot'))) },
    'Spirit Temple Sun Block Room Chest': () => { return (has('Small Key (Spirit Temple)', 5) && has_explosives() && can_play('Requiem of Spirit')) || (has_fire_source() && (has_explosives() || has('Small Key (Spirit Temple)', 2))) },
    'Spirit Temple Statue Hand Chest': () => { return has('Small Key (Spirit Temple)', 3) && has('Progressive Strength Upgrade', 2) && is_adult() && can_play('Zeldas Lullaby') },
    'Spirit Temple NE Main Room Chest': () => { return has('Small Key (Spirit Temple)', 3) && has('Progressive Strength Upgrade', 2) && is_adult() && can_play('Zeldas Lullaby') && has('Progressive Hookshot') },
    'Mirror Shield Chest': () => { return has('Small Key (Spirit Temple)', 4) && has('Progressive Strength Upgrade', 2) && is_adult() && has_explosives() },
    'Silver Gauntlets Chest': () => { return (has('Small Key (Spirit Temple)', 3) && has('Progressive Hookshot', 2) && has_explosives()) || has('Small Key (Spirit Temple)', 5) },
    'Spirit Temple Near Four Armos Chest': () => { return has('Mirror Shield') && has_explosives() },
    'Spirit Temple Hallway Left Invisible Chest': () => { return can_see_with_lens() && has_explosives() },
    'Spirit Temple Hallway Right Invisible Chest': () => { return can_see_with_lens() && has_explosives() },
    'Spirit Temple Boss Key Chest': () => { return can_play('Zeldas Lullaby') && has('Bow') && has('Progressive Hookshot') && can_blast_or_smash() },
    'Spirit Temple Topmost Chest': () => { return has('Mirror Shield') },
    'Twinrova': () => { return has('Mirror Shield') && has_explosives() && has('Progressive Hookshot') && has('Boss Key (Spirit Temple)') },
    'Twinrova Heart': () => { return has('Mirror Shield') && has_explosives() && has('Progressive Hookshot') && has('Boss Key (Spirit Temple)') },
    'Zelda': () => { return has('Shadow Medallion') && has('Spirit Medallion') },
    'Ganons Castle Forest Trial Clear': () => { return has('Magic Meter') && has('Bow') && has('Light Arrows') && (has('Fire Arrows') || (has('Progressive Hookshot') && has('Dins Fire'))) },
    'Ganons Castle Fire Trial Clear': () => { return has('Progressive Strength Upgrade', 3) && has('Magic Meter') && has('Bow') && has('Light Arrows') && has('Progressive Hookshot', 2) },
    'Ganons Castle Water Trial Clear': () => { return has_bottle() && has('Hammer') && has('Magic Meter') && has('Bow') && has('Light Arrows') },
    'Ganons Castle Shadow Trial Clear': () => { return has('Magic Meter') && has('Bow') && has('Light Arrows') && has('Hammer') && (has('Fire Arrows') || has('Progressive Hookshot', 2)) && (can_see_with_lens() || (has('Hover Boots') && has('Progressive Hookshot', 2))) },
    'Ganons Castle Shadow Trial First Chest': () => { return (has('Magic Meter') && has('Bow') && has('Fire Arrows')) || has('Progressive Hookshot') || has('Hover Boots') || can_play('Song of Time') },
    'Ganons Castle Shadow Trial Second Chest': () => { return (has('Magic Meter') && has('Bow') && has('Fire Arrows')) || (has('Progressive Hookshot', 2) && has('Hover Boots')) },
    'Ganons Castle Spirit Trial Clear': () => { return has('Magic Meter') && has('Bow') && has('Light Arrows') && has('Mirror Shield') && has_bombchus() && has('Progressive Hookshot') },
    'Ganons Castle Spirit Trial First Chest': () => { return has('Progressive Hookshot') && (has('Magic Meter') || has_explosives()) },
    'Ganons Castle Spirit Trial Second Chest': () => { return has('Progressive Hookshot') && has('Magic Meter') && has_bombchus() && can_see_with_lens() },
    'Ganons Castle Light Trial Clear': () => { return has('Magic Meter') && has('Bow') && has('Progressive Hookshot') && has('Light Arrows') && has('Small Key (Ganons Castle)', 2) },
    'Ganons Castle Light Trail Invisible Enemies Chest': () => { return can_see_with_lens() },
    'Ganons Castle Light Trial Lullaby Chest': () => { return can_play('Zeldas Lullaby') && has('Small Key (Ganons Castle)', 1) },
    'Ganon': () => { return (has('Magic Meter') && has('Bow') && has('Light Arrows'))  },
    'Tektite Grotto Freestanding PoH': () => { return has('Progressive Scale', 2) || (has('Iron Boots') && is_adult()) },
    'GS Kokiri Know It All House': () => { return nighttime() && can_reach('Hyrule Field') },
    'GS Kokiri Bean Patch': () => { return has_bottle() },
    'GS Kokiri House of Twins': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Lost Woods Bean Patch Near Bridge': () => { return has_bottle() },
    'GS Lost Woods Bean Patch Near Stage': () => { return has_bottle() },
    'GS Lost Woods Above Stage': () => { return has('Magic Bean') && nighttime() },
    'GS Sacred Forest Meadow': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Deku Tree Basement Vines': () => { return has('Slingshot') || has_explosives() || has('Boomerang') || (has('Dins Fire') && has('Magic Meter')) },
    'GS Deku Tree Basement Back Room': () => { return has('Boomerang') && has_explosives() },
    'GS Hyrule Field near Kakariko': () => { return (has('Boomerang') && has_explosives()) || (has('Progressive Hookshot') && is_adult()) },
    'GS Hyrule Field Near Gerudo Valley': () => { return (has('Hammer') && has_fire_source() && has('Progressive Hookshot') && is_adult()) || (has('Boomerang') && has_explosives() && has('Dins Fire') && has('Magic Meter')) },
    'GS Hyrule Castle Grotto': () => { return has('Boomerang') && has_explosives() },
    'GS Lon Lon Ranch Rain Shed': () => { return nighttime() },
    'GS Lon Lon Ranch House Window': () => { return has('Boomerang') && nighttime() },
    'GS Lon Lon Ranch Back Wall': () => { return has('Boomerang') && nighttime() },
    'GS Kakariko House Under Construction': () => { return nighttime() },
    'GS Kakariko Skulltula House': () => { return nighttime() },
    'GS Kakariko Guard\'s House': () => { return nighttime() },
    'GS Kakariko Tree': () => { return nighttime() },
    'GS Kakariko Watchtower': () => { return has('Slingshot') || has_explosives() && nighttime() },
    'GS Kakariko Above Impa\'s House': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Graveyard Wall': () => { return has('Boomerang') && nighttime() },
    'GS Graveyard Bean Patch': () => { return has_bottle() },
    'GS Mountain Trail Bean Patch': () => { return has_bottle() && (has_explosives() || has('Progressive Strength Upgrade')) },
    'GS Mountain Trail Bomb Alcove': () => { return can_blast_or_smash() },
    'GS Mountain Trail Path to Crater': () => { return has('Hammer') && is_adult() && nighttime() },
    'GS Mountain Trail Above Dodongo\'s Cavern': () => { return has('Hammer') && is_adult() && nighttime() },
    'GS Goron City Boulder Maze': () => { return has_explosives() },
    'GS Goron City Center Platform': () => { return is_adult() },
    'GS Death Mounter Bean Patch': () => { return can_play('Bolero of Fire') && has_bottle() },
    'GS Dodongo\'s Cavern Vines Above Stairs': () => { return has_explosives() || (has('Boomerang') || has('Slingshot') && has('Progressive Strength Upgrade')) || (has('Dins Fire') && has('Magic Meter')) || (is_adult && (has('Progressive Hookshot') || has('Bow') || has('Biggoron Sword'))) },
    'GS Dodongo\'s Cavern Alcove Above Stairs': () => { return (has('Progressive Hookshot') && is_adult()) || (has('Boomerang') && (has_explosives() || has('Progressive Strength Upgrade'))) },
    'GS Dodongo\'s Cavern Scarecrow': () => { return is_adult() && ( (has('Progressive Hookshot') && has_ocarina()) || has('Progressive Hookshot', 2) ) },
    'GS Zora River Ladder': () => { return nighttime() },
    'GS Zora River Near Raised Grottos': () => { return has('Progressive Hookshot') && nighttime() },
    'GS Zora River Above Bridge': () => { return has('Progressive Hookshot') && nighttime() },
    'GS Zora\'s Domain Frozen Waterfall': () => { return nighttime() && (has('Progressive Hookshot') || has('Bow') || has('Magic Meter')) },
    'GS Zora\'s Fountain Above the Log': () => { return has('Boomerang') },
    'GS Zora\'s Fountain Hidden Cave': () => { return has('Progressive Strength Upgrade', 2) && can_blast_or_smash() && has('Progressive Hookshot') && nighttime() },
    'GS Lake Hylia Bean Patch': () => { return has_bottle() },
    'GS Lake Hylia Lab Wall': () => { return has('Boomerang') && nighttime() },
    'GS Lake Hylia Small Island': () => { return nighttime() },
    'GS Lake Hylia Giant Tree': () => { return is_adult() && has('Progressive Hookshot', 2) },
    'GS Lab Underwater Crate': () => { return is_adult() && has('Iron Boots') && has('Progressive Hookshot') },
    'GS Forest Temple First Room': () => { return (has('Progressive Hookshot') || has('Bow') || (has('Dins Fire') && has('Magic Meter'))) && is_adult() },
    'GS Forest Temple Lobby': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Forest Temple Outdoor East': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Forest Temple Outdoor West': () => { return (has('Progressive Hookshot', 2) || (has('Progressive Hookshot') && can_reach('Forest Temple Outside Upper Ledge'))) && is_adult() },
    'GS Forest Temple Basement': () => { return has('Progressive Hookshot') },
    'GS Fire Temple Song of Time Room': () => { return has('Small Key (Fire Temple)', 1) && can_play('Song of Time') },
    'GS Fire Temple Unmarked Bomb Wall': () => { return has('Small Key (Fire Temple)', 3) && has_explosives() },
    'GS Fire Temple East Tower Climb': () => { return has_ocarina() && has('Small Key (Fire Temple)', 5) && has('Progressive Hookshot') && is_adult() },
    'GS Fire Temple East Tower Top': () => { return has_ocarina() && has('Small Key (Fire Temple)', 5) && has('Progressive Hookshot') && is_adult() },
    'GS Fire Temple Basement': () => { return has('Hammer') && is_adult() },
    'GS Ice Cavern Spinning Scythe Room': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Ice Cavern Heart Piece Room': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Ice Cavern Push Block Room': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Water Temple South Basement': () => { return has_explosives() && (has('Magic Meter') || has('Biggoron Sword')) },
    'GS Water Temple Serpent River': () => { return can_play('Song of Time') && has('Small Key (Water Temple)', 6) },
    'GS Water Temple Falling Platform Room': () => { return has('Progressive Hookshot', 2) },
    'GS Water Temple Central Room': () => { return has('Progressive Hookshot', 2) },
    'GS Water Temple Near Boss Key Chest': () => { return has('Progressive Hookshot', 2) && ((has_explosives() && has('Progressive Strength Upgrade')) || has('Hover Boots')) && has('Small Key (Water Temple)', 6) }, 
    'GS Well West Inner Room': () => { return has('Small Key (Bottom of the Well)', 3) && has('Boomerang') && (has('Progressive Strength Upgrade') || has_explosives() || can_see_with_lens()) },
    'GS Well East Inner Room': () => { return has('Small Key (Bottom of the Well)', 3) && has('Boomerang') },
    'GS Well Like Like Cage': () => { return has('Small Key (Bottom of the Well)', 3) && has('Boomerang') },
    'GS Shadow Temple Like Like Room': () => { return has('Progressive Hookshot') },
    'GS Shadow Temple Crusher Room': () => { return has('Progressive Hookshot') },
    'GS Shadow Temple Near Ship': () => { return has('Progressive Hookshot', 2) && has('Progressive Strength Upgrade') && has('Small Key (Shadow Temple)', 4) },
    'GS Gerudo Valley Small Bridge': () => { return has('Boomerang') && nighttime() },
    'GS Gerudo Valley Bean Patch': () => { return has_bottle() },
    'GS Gerudo Valley Behind Tent': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Gerudo Valley Pillar': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Gerudo Fortress Archery Range': () => { return has('Progressive Hookshot') && has('Gerudo Membership Card') && is_adult() && nighttime() },
    'GS Gerudo Fortress Top Floor': () => { return nighttime() },
    'GS Wasteland Ruins': () => { return has('Progressive Hookshot') && is_adult() },
    'GS Desert Colossus Bean Patch': () => { return has_bottle() && can_play('Requiem of Spirit') },
    'GS Desert Colossus Tree': () => { return has('Progressive Hookshot') && is_adult() && nighttime() },
    'GS Desert Colossus Hill': () => { return ((has('Magic Bean') && can_play('Requiem of Spirit')) || has('Progressive Hookshot', 2)) && is_adult() && nighttime() },
    'GS Spirit Temple Metal Fence': () => { return has('Boomerang') || has('Slingshot') },
    'GS Spirit Temple Hall to West Iron Knuckle': () => { return (has('Boomerang') && has('Progressive Hookshot')) || (has('Boomerang') && has('Small Key (Spirit Temple)', 5) && has_explosives() && can_play('Requiem of Spirit')) || (has('Progressive Hookshot') && has('Progressive Strength Upgrade', 2) && is_adult() && has('Small Key (Spirit Temple)', 3)) },
    'GS Spirit Temple Boulder Room': () => { return can_play('Song of Time') && (has('Bow') || has('Progressive Hookshot') || has_explosives()) },
    'GS Spirit Temple Lobby': () => { return has('Progressive Strength Upgrade', 2) && has('Small Key (Spirit Temple)', 3) && is_adult() && (has('Progressive Hookshot', 2) || (has('Progressive Hookshot') && has_ocarina()) || has('Hover Boots')) },
};
