import { Inject } from '@nestjs/common';

import { getCustomRepositoryToken, getRepositoryToken } from './typeorm.utils';

export const InjectRepository = (entity: Function) => Inject(getRepositoryToken(entity));

export const InjectCustomReposity = (entity: Function) => Inject(getCustomRepositoryToken(entity));
