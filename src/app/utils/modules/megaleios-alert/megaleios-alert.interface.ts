
export enum MegaleiosAlertType {
  Success, Error
}

export class MegaleiosAlert {

  type: MegaleiosAlertType;
  message: string;

  constructor(init: Partial<MegaleiosAlert>) {
    Object.assign(this, init);
  }

}
