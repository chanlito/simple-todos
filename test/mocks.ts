import { Roles } from '../src/common';
import { User, Role, Profile } from "../src/entity";

export const userRole = new Role();
userRole.id = 3;
userRole.name = Roles.User;

export const jamesBondProfile = new Profile();
jamesBondProfile.id = 1;
jamesBondProfile.lastName = 'bond';
jamesBondProfile.firstName =  'james';

export const jamesBond = new User();
jamesBond.id = 1;
jamesBond.email = 'jamebond@test.com';
jamesBond.role = userRole;
jamesBond.password = '123456';
jamesBond.profile = jamesBondProfile;

