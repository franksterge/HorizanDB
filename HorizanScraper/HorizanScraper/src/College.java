
public class College {

	String name;
	
	String population;
	String deadline;
	String avgSAT;
	String tuition;
	String acceptanceRate;
	
	public College (String a, String b, String c, String d, String e, String f) {
		name = a;
		population = b;
		deadline = c;
		avgSAT = d;
		tuition = e;
		acceptanceRate = f;
	}
	
	public String toString() {
		return name + ": " + population + " " + deadline + " " + avgSAT + " " + tuition + " " + acceptanceRate;
	}
}
