<?php

use Phalcon\Di;

class Permission
{
    public function check($context, $minRole = ROLE_RESTRICTED, $level = LEVEL_SECTION) {
      $session = Di::getDefault()->getSession();

      $roles = $session->get('roles');
      if(!isset($roles)) { return false; }
      return ($roles[$level][$context] >= $minRole);
    }
    
    public function updatePermissions() {
      $session = Di::getDefault()->getSession();
      $user = $session->get('user');
      $rolesAndScope = UsersToRoles::getRolesAndScope($user['id']);
      $session->set('roles', $rolesAndScope['roles']);
      $session->set('scope', $rolesAndScope['scope']);
    }
}