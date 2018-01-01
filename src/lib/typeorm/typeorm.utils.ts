export function getRepositoryToken(entity: Function) {
  return `${entity.name}Repository`;
}

export function getCustomRepositoryToken(entity: Function) {
  return `${entity.name}CustomRepository`;
}
