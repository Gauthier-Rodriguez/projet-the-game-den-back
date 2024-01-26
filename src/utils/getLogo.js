const getLogo = (platform) => {
    const nintendoPlatforms = ['nintendo', 'switch','wii','gamecube','gameboy','game boy', 'ds', '3ds', 'Famicom'];
    const platformName = platform.name.toLowerCase();

    if(platformName.includes('playstation')) return 'playstation.svg';
    if(platformName.includes('xbox')) return 'xbox.svg';
    if(nintendoPlatforms.some((p) => platformName.includes(p))) return 'nintendo.svg';
    if(platformName.includes('pc')) return 'pc.svg';
    if(platformName.includes('ios')) return 'ios.svg';
    if(platformName.includes('android')) return 'android.svg';
    if(platformName.includes('mac')) return 'mac.svg';
    if(platformName.includes('linux')) return 'linux.svg';

    return 'platform.svg';
  };

  module.exports = getLogo;