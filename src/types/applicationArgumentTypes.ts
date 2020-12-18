/**
 * This interface defines properties for application arguments object.
 */
export default interface ApplicationArgumentTypes {
  /**
   * help command set to true displays the information about this application.
   */
  help?: boolean;

  /**
   * input string defines the path to file to be processed.
   */
  input?: string;

  /**
   * schema string defines the path to schema file to compare with.
   */
  schema?: string;
}
