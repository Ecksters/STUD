<?php
set_error_handler('exceptions_error_handler');

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://127.0.0.1:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
   header( "HTTP/1.1 200 OK" );
   exit();
}

define('LEVEL_PUBLIC', 0); define('LEVEL_SECTION', 1); define('LEVEL_LOCATION', 2); define('LEVEL_REGION', 3); define('LEVEL_SYSTEM', 4);
define('ROLE_GUEST', 0); define('ROLE_RESTRICTED', 1); define('ROLE_USER', 2); define('ROLE_SECTIONMOD', 3); define('ROLE_LOCATIONMOD', 4);
define('ROLE_LOCATIONADMIN', 5); define('ROLE_REGIONADMIN', 6); define('ROLE_SYSTEMADMIN', 7);

use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter,
    Phalcon\Session\Adapter\Files as Session,
    Phalcon\Mvc\Model\Manager as ModelsManager,
    Phalcon\Mvc\Micro\Collection as MicroCollection;

$loader = new \Phalcon\Loader();
$loader->registerDirs(
    [
        realpath(__DIR__ . '/models/'),
        realpath(__DIR__ . '/controllers/'),
        realpath(__DIR__ . '/services/')
    ]
)->register();

$di = new \Phalcon\DI\FactoryDefault();

// Setup the database service
try {
  $di->setShared('db', new DbAdapter(
          [
              'host'     => 'localhost',
              'username' => 'root',
              'password' => '',
              'dbname'   => 'stud',
          ])
  );
}
catch(Exception $error) {
  throw new ErrorException('DB Error: Could not connect to database, ask System Administrator for support.', 500, 10);
}

$di->setShared('modelsManager', new ModelsManager());

$di->setShared('session', function() {
    $session = new Session();
    $session->start();
    return $session;
});

$di->setShared('permission', 'Permission');

$permissions = [];

$app = new \Phalcon\Mvc\Micro($di);

// Users handler
$users = new MicroCollection();
$users->setHandler('UsersController', true);
$users->setPrefix('/users');
$users->post('/checkLogin', 'checkLogin');
$users->post('/getPermissions', 'getPermissions');
$users->post('/setStayLoggedIn', 'setStayLoggedIn');
$users->post('/register', 'register');
$users->post('/login', 'login');
$users->post('/logout', 'logout');
$users->post('/getUser', 'getUser');
$users->post('/updateUser', 'updateUser');
$app->mount($users);
$permissions['UsersController'] = [
  'default_role' => ROLE_RESTRICTED,
  'default_level' => LEVEL_SYSTEM,
  'checkLogin' => ROLE_GUEST,
  'setStayLoggedIn' => ROLE_LOCATIONADMIN,
  'register' => ROLE_GUEST,
  'login' => ROLE_GUEST
];

// Refurbs handler
$refurbs = new MicroCollection();
$refurbs->setHandler('RefurbsController', true);
$refurbs->setPrefix('/refurbs');
$refurbs->post('/add', 'add');
$refurbs->post('/verify', 'verify');
$refurbs->post('/update', 'update');
$refurbs->post('/donate', 'donate');
$refurbs->post('/get', 'get');
$app->mount($refurbs);
$permissions['RefurbsController'] = [
    'default_role' => ROLE_USER,
    'default_level' => LEVEL_LOCATION,
    'add' => [ROLE_USER, LEVEL_SECTION],
    'donate' => ROLE_LOCATIONADMIN
];

// System handler
$system = new MicroCollection();
$system->setHandler('SystemController', true);
$system->setPrefix('/system');
$system->post('/getAccessCodes', 'getAccessCodes');
$system->post('/region/create', 'createChild');
$app->mount($system);
$permissions['SystemController'] = [
    'default_role' => ROLE_SYSTEMADMIN,
    'default_level' => LEVEL_SYSTEM
];

// Region handler
$region = new MicroCollection();
$region->setHandler('RegionController', true);
$region->setPrefix('/region');
$region->post('/update', 'updateLevel');
$region->post('/disable', 'disableLevel');
$region->post('/getAccessCodes', 'getAccessCodes');
$region->post('/editAccessCode', 'editAccessCode');
$region->post('/location/create', 'createChild');
$region->post('/getUsers', 'getUsers');
$region->post('/getTeams', 'getTeams');
$app->mount($region);
$permissions['RegionController'] = [
    'default_role' => ROLE_REGIONADMIN,
    'default_level' => LEVEL_REGION,
    'disableLevel' => ROLE_SYSTEMADMIN
];

// Location handler
$location = new MicroCollection();
$location->setHandler('LocationController', true);
$location->setPrefix('/location');
$location->post('/update', 'updateLevel');
$location->post('/disable', 'disableLevel');
$location->post('/getAccessCodes', 'getAccessCodes');
$location->post('/editAccessCode', 'editAccessCode');
$location->post('/section/create', 'createChild');
$location->post('/getUsers', 'getUsers');
$location->post('/getTeams', 'getTeams');
$app->mount($location);
$permissions['LocationController'] = [
    'default_role' => ROLE_LOCATIONADMIN,
    'default_level' => LEVEL_LOCATION,
    'disableLevel' => ROLE_REGIONADMIN
];

// Section handler
$section = new MicroCollection();
$section->setHandler('SectionController', true);
$section->setPrefix('/section');
$section->post('/update', 'updateLevel');
$section->post('/disable', 'disableLevel');
$section->post('/getAccessCodes', 'getAccessCodes');
$section->post('/editAccessCode', 'editAccessCode');
$section->post('/getUsers', 'getUsers');
$section->post('/createTeam', 'createTeam');
$section->post('/acceptTeams', 'acceptTeams');
$section->post('/rejectTeams', 'rejectTeams');
$section->post('/retireTeams', 'retireTeams');
$section->post('/getTeams', 'getTeams');
$app->mount($section);
$permissions['SectionController'] = [
    'default_role' => ROLE_LOCATIONADMIN,
    'default_level' => LEVEL_SECTION,
    'disableLevel' => ROLE_LOCATIONADMIN,
    'getUsers' => ROLE_RESTRICTED,
    'getTeams' => ROLE_RESTRICTED,
    'createTeam' => ROLE_USER
];

// StatsByLocation handler
$locationStats = new MicroCollection();
$locationStats->setHandler('StatsByLocationController', true);
$locationStats->setPrefix('/locationStats');
$locationStats->post('/leaderboards', 'getStats');
$app->mount($locationStats);
$permissions['StatsByLocationController'] = [
    'default_role' => ROLE_RESTRICTED,
    'default_level' => LEVEL_LOCATION
];

$app->notFound(
    function () use ($app) {
        throw new ErrorException('URI not found: ' . $app->request->getMethod() . ' ' . $app->request->getURI(), 404, 10);
    }
);

$app->before(function() use ($app, $permissions) {
  if(stripos($app->request->getServer('CONTENT_TYPE'), 'json') !== false){ //Decode JSON requests in POST
      $_POST = json_decode($app->request->getRawBody(), true);    
  }

  $roles = $app->session->get('user');
  $roles = isset($roles['roles']) ? $roles['roles'] : ROLE_GUEST;
  $handler = $app->getActiveHandler();
  $controller = $handler[0]->getDefinition();
  $route = $handler[1];
  $contexts = isset($permissions[$controller]['default_level']) &&
         $permissions[$controller]['default_level'] === LEVEL_SYSTEM ? [0] : $app->request->getPost('context');

  if($permissions[$controller] === ROLE_GUEST ||
          (isset($permissions[$controller][$route]) && $permissions[$controller][$route]  === ROLE_GUEST)) {
      return true; //Let guests through
  }

  $toCheck;
  if(isset($permissions[$controller][$route])) { //Route has specific permissions required
    if(is_array($permissions[$controller][$route])) { // Specific access role at specific level required with context
      $toCheck = [$permissions[$controller][$route][0], $permissions[$controller][$route][1], $contexts];
    } else {  // Route only requires minimum role within contexts, at default level
      $toCheck = [$permissions[$controller][$route], $permissions[$controller]['default_level'], $contexts];
    }
  } else { // Default required access, with contexts, at the default level
    $toCheck = [$permissions[$controller]['default_role'], $permissions[$controller]['default_level'], $contexts];
  }

  if(!is_array($toCheck[2])) {
    throw new ErrorException('Insufficient Permissions to access: ' . $app->request->getMethod() .
            ' ' . $app->request->getURI() . ', invalid context(s) provided: ' . var_export($contexts, true), 403, 10);
  }

  foreach($toCheck[2] as $context) {
    try{
      if(!$app->permission->check($context, $toCheck[0], $toCheck[1])) {
        throw new ErrorException();
      }
    }
    catch(Exception $error) {
      throw $error; //Remove this in Production
      throw new ErrorException('Insufficient Permissions to access: ' . $app->request->getMethod() .
            ' ' . $app->request->getURI() . ', invalid context(s) provided: ' . var_export($contexts, true), 403, 10);
    }
  }
  return true; //Passed all checks on all contexts provided
});

try {
  sleep(1);
  $app->handle();
  $app->response->setJsonContent($app->getReturnedValue(), JSON_UNESCAPED_UNICODE)->send();
} catch (Exception $exception) {
  http_response_code(500);
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(
    ['errors' => [
        [
          'errorType' => 'system',
          'code'    => 500,
          'message' => $exception->getMessage()
        ],
        [
          'errorType' => 'internal',
          'code' => $exception->getCode(),
          'location' => $exception->getFile() . ' on line ' . $exception->getLine(),
          'trace' => $exception->getTraceAsString()
        ]
      ]
    ], JSON_UNESCAPED_UNICODE);
}

function exceptions_error_handler($severity, $message, $filename, $lineno) {
  if (error_reporting() == 0) {
    return;
  }
  if (error_reporting() & $severity) {
    throw new ErrorException($message, 0, $severity, $filename, $lineno);
  }
}
