function has(item, count) {
  count = count ? count : 1;
  return item in state.currentItemsAll && state.currentItemsAll[item] >= count;
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

function is_child() {
  return state.currentAge == 'Child';
}

function is_adult() {
  return state.currentAge == 'Adult';
}

function nighttime() {
  return true;
}

function has_explosives() {
  return has('Bomb Bag');
}

function guarantee_hint() {
  return true;
}

function has_bombchus() {
  return has_explosives();
}

function can_blast_or_smash() {
  return has('Bomb Bag') || (is_adult() && has('Hammer')) || has_bombchus();
}

function has_bottle() {
  return false;
}

function can_reach(loc) {
  return false;
}

function can_dive() {
  return has('Progressive Scale');
}

function flagSet(flag) {
  return $.inArray(flag, setFlags) != -1;
}

/*function can_finish_adult_trades() {
  zora_thawed = has_bottle() && has('Zeldas Lullaby') && (can_reach('Ice Cavern') || can_reach('Ganons Castle Water Trial') || has('Progressive Wallet', 2));
  carpenter_access = has('Epona') || has('Progressive Hookshot', 2);
  return (has('Claim Check') || ((has('Eyedrops') || has('Eyeball Frog') || has('Prescription') || has('Broken Sword')) && zora_thawed) || ((has('Poachers Saw') || has('Odd Mushroom') || has('Cojiro') || has('Pocket Cucco') || has('Pocket Egg')) && zora_thawed && carpenter_access));
}*/