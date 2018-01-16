import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'todo', paranoid: true })
export default class Todo extends Model<Todo> {
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column description?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDone = false;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPublic = false;

  @CreatedAt createdDate: Date;

  @UpdatedAt updatedDate: Date;

  @DeletedAt deletedDate: Date;
}
