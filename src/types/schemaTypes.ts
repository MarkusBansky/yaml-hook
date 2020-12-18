export type SchemaObjectProperty = {
  type: 'string' | 'number';
  required: boolean;
  description?: string;
};

export default interface Schema {
  [key: string]: SchemaObjectProperty | Schema;
}
