import { Level, Role, SharedService } from './../../../shared/services/shared.service';
import { LevelService } from '../../../shared/services/level.service';

export class SharedAdministration {
  regionId: string;
  region: any;
  locationId: string;
  location: any;
  sectionId: string;
  section: any;

  levelName: string;
  levelProperName: string;
  level: any;
  levelId: any;

  childName: string;
  childProperName: string;
  children: any;

  accessCodes: any;

  teams: any;

  constructor(public levelService: LevelService, public sharedService: SharedService) {
    this.levelName = levelService.level;
    this.levelProperName = sharedService.capitalize(levelService.level);
    if (sharedService[this.levelName + 'Selected'] || this.levelName === 'system') {
      if (this.levelName === 'region' || this.levelName === 'location' || this.levelName === 'section') {
        this.regionId = sharedService.regionSelected;
        this.region = sharedService.scope[this.regionId];
      }
      if (this.levelName === 'location' || this.levelName === 'section') {
        this.locationId = sharedService.locationSelected;
        this.location = sharedService.scope[this.regionId][this.locationId];
      }
      if (this.levelName === 'section') {
        this.sectionId = sharedService.sectionSelected;
        this.section = sharedService.scope[this.regionId][this.locationId][this.sectionId];
      }
      this.level = this[this.levelName] || sharedService.scope;
      this.levelId = levelService.levelId = this[this.levelName + 'Id'] || 0;

      this.children = JSON.parse(JSON.stringify(this.level));
      delete this.children.name;
      this.children = Object.keys(this.children).map(key => {
        this.children[key].id = key;
        return this.children[key];
      });

      const levelIndex = LevelService.levels.indexOf(this.levelName);
      levelService.parentId = this[LevelService.levels[levelIndex + 1] + 'Id'] || 0;
      if (levelIndex > 0) {
        this.childName = LevelService.levels[levelIndex - 1];
        this.childProperName = sharedService.capitalize(this.childName);
      }
      if (this.levelName !== 'system') {
        levelService.getTeams().subscribe((result: any) => this.teams = result);
      }

      levelService.getAccessCodes().subscribe((result: any) => this.accessCodes = result);
    }
  }
}

