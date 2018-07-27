
public class College {

	/**
	 * Note to future developer:
	 * I coded this badly, I know. To fix this, I would recommend using a HashMap for all the attributes, and just having the name a separate field
	 * But for now i had to do this
	 */
	
	String name;
	
	String avgACT;
	String avgSAT;
	
	public College (String n, String a, String b) {
		name = n;
		avgACT = a;
		avgSAT = b;
	}
	
	public String toString() {
		return name + ": " + avgACT + " " + avgSAT;
	}
}
