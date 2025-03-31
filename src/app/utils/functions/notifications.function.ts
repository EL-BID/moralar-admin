export class NotificationsFunction {
  public static handleRouterEvent(callback: () => void) {
    const EXECUTION_INTERVAL = 1 * 60 * 1000; // 1 minutes in milliseconds
    const STORAGE_KEY = 'lastExecutionTime';

    const lastExecutionTime = sessionStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if ( !lastExecutionTime || ( now - parseInt( lastExecutionTime, 10 ) ) > 
        EXECUTION_INTERVAL ) {
      callback();
      sessionStorage.setItem(STORAGE_KEY, now.toString());
    }
  }

  public static checkSessionStorageAndRefresh(): boolean {
    const sessionValue = sessionStorage.getItem( 'lastExecutionTime' );
    return sessionValue && parseInt( sessionValue, 10 ) > 0;
  }

  public static notificationDontViewed( seenBy: string | null, userId: string): boolean {
    return (
      seenBy === null || seenBy === undefined ) ||
      !( seenBy !== null && seenBy.split( ',' ).includes( userId ) );
  }

  public static notificationHaveRedirect( module: string ): boolean {
    if ( module != null ) {
      const path = module.split( '.' )[ 1 ];
      const id1 = module.split( '/' )[ 1 ];

      switch ( path ) {
        case 'agendamento':
        case 'quest-sended':
        case 'match-selled':
          return true;
      }
    }
    return false;
  }
}