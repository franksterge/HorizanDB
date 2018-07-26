import java.io.File;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.gson.Gson;

public class Main {

	static WebDriver driver;
	static WebDriverWait wait;
	static JavascriptExecutor jse;
	static Actions actions;
	
	static ArrayList<WebElement> allElements, elementsW, elementsY;
	static ArrayList<String> deadlines;
	static ArrayList<College> allColleges;
	static ArrayList<String> errorColleges;
	
	static String[] unis;
	static HashMap<String, String> info;
	
	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException{
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addExtensions(new File("ublock.crx"));
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setBrowserName("chrome");
		capabilities.setPlatform(Platform.WINDOWS);
		capabilities.setCapability(ChromeOptions.CAPABILITY, options);
		driver = new ChromeDriver(capabilities);
		actions = new Actions(driver);
		jse = (JavascriptExecutor)driver;
		/* initialize */
		readUniversities();
		wait = new WebDriverWait(driver, 10);
		Gson gson = new Gson();
		allColleges = new ArrayList<College>();
		info = new HashMap<String, String>();
		errorColleges = new ArrayList<String>();

		/* Run Scraping */
		
		for(int i = 1; i < unis.length; i++) {
			System.out.println(unis[i]);
			info.clear();
			try {
				IPEDS(driver, unis[i]);
				getPetersonData(unis[i]);
				College test = new College(unis[i], info.get("Population"), info.get("Deadline"), info.get("SAT Range"), info.get("TuitionFees"), info.get("AdmissionRate"));
				allColleges.add(test);
				System.out.println(test.toString());
				System.out.println();
			}catch(Exception e) {
				e.printStackTrace();
				errorColleges.add(unis[i]);
				String json = new Gson().toJson(allColleges);
				tryOutput(json);
			}
		}
		String json = new Gson().toJson(allColleges);
		tryOutput(json);
		if(errorColleges.size() > 0)
			writeErrorCollege();
	}
	
	public static void writeErrorCollege() {
		try {
			PrintWriter writer = new PrintWriter(new FileOutputStream("errors.txt", false));
			for(String s : errorColleges) {
				writer.println(s + "\n");
				writer.close();
			}
			System.out.println("Errors written to file errors.txt");
		}catch(Exception e) {
			System.out.println("error printing to file; outputting to console");
			for(String s : errorColleges) {
				System.out.println(s);
			}
		}
	}
	
	public static void tryOutput(String json) {
		try {
			PrintWriter writer = new PrintWriter(new FileOutputStream("output.txt", false));
			writer.println(json);
			writer.close();
			System.out.println("Written to file output.txt");
		}catch(Exception e) {
			System.out.println("error printing to file; outputting to console");
			System.out.println(json);
		}
	}
	
	public static void readUniversities() throws FileNotFoundException {
	    Scanner scanner = new Scanner(new File("input.csv"));
	    scanner.useDelimiter(",");
	    unis = scanner.nextLine().split(",");
	    scanner.close();
	}
	
	public static void IPEDS(WebDriver driver, String uniName) throws InterruptedException, UnsupportedEncodingException {
		String temp = "";
		String originalURL = "";
		
		String universityName = uniName.replaceAll(" ", "+"); //TODO Add actual string later
		driver.get("https://nces.ed.gov/collegenavigator/?q=" + universityName + "&s=all");
		Thread.sleep(3000);
		//WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("resultsW")));

		//Fuzzy Search: Used when multiple colleges come up on search. Chooses Best
		//TODO: Add print to file for uncertain ones
		allElements = new ArrayList<WebElement>();
		elementsW = new ArrayList<WebElement>(driver.findElements(By.className("resultsW")));
		elementsY = new ArrayList<WebElement>(driver.findElements(By.className("resultsY")));
		Iterator<WebElement> itA = elementsW.iterator();
	    Iterator<WebElement> itB = elementsY.iterator();
	    while (itA.hasNext() || itB.hasNext()) {
	        if (itA.hasNext()) allElements.add(itA.next());
	        if (itB.hasNext()) allElements.add(itB.next());
	    }
		int elementPos = -10;
		int fuzzyScore = Integer.MIN_VALUE;
		int currentScore = Integer.MIN_VALUE;
		for (int i = 0; i < allElements.size(); i++) {
			WebElement tempE = allElements.get(i);
			currentScore = FuzzyScore.fuzzyScore(universityName, tempE.getText());
			if(currentScore > fuzzyScore) {	//replace smol score with bigger score
				elementPos = i;
				fuzzyScore = currentScore;
			}
		}
		elementPos+=1;
		System.out.println("\nSearch Position Chosen: " + elementPos);
		//get nth tr based on elementPos and second td and find the href link
		WebElement element = driver.findElement(By.xpath("//tr[" + elementPos + "]//td[2]//a"));
		element.click();
		
		//pop
		element = driver.findElement(By.xpath("(//td[@class='srb'])[7]/../td[2]"));
		temp = element.getText().split(" ")[0];
		//System.out.println(temp);
		info.put("Population", temp);
		
		/*
		//SFR
			element = driver.findElement(By.xpath("(//td[@class='srb'])[8]/../td[2]"));
			temp = element.getText();
			System.out.println(temp);
			info.put("SFR", temp);
			
					
	//Tuition (WRONG DATA DONT USE)
		driver.get(originalURL + "#expenses");
		driver.navigate().refresh();
		element = driver.findElement(By.xpath("(//td[contains(text(), 'Tuition and fees')])/../td[5]"));
		temp = element.getText();
		System.out.println("Tuition: "+ temp);
		info.put("TuitionFees", temp);
		*/
		
	//Type of Uni
		element = driver.findElement(By.xpath("(//td[@class='srb'])[3]/../td[2]"));
		temp = element.getText();
		System.out.println(temp);
		info.put("type", temp);
		
	//setting
		element = driver.findElement(By.xpath("(//td[@class='srb'])[5]/../td[2]"));
		temp = element.getText();
		System.out.println(temp);
		info.put("setting", temp);
		
	//Admissions
		originalURL = driver.getCurrentUrl();
		driver.get(originalURL + "#admsns");
		driver.navigate().refresh();
		element = driver.findElement(By.xpath("(//td[contains(text(), 'Percent admitted')])/../td[2]"));
		temp = element.getText();
		//System.out.println(temp);
		info.put("AdmissionRate", temp);
		
	//SAT
		element = driver.findElement(By.xpath("(//td[text()='SAT Evidence-Based Reading and Writing'])/../td[2]"));
		int r1 = Integer.parseInt(element.getText());
		element = driver.findElement(By.xpath("(//td[text()='SAT Evidence-Based Reading and Writing'])/../td[3]"));
		int r2 = Integer.parseInt(element.getText());    
		element = driver.findElement(By.xpath("(//td[text()='SAT Math'])/../td[2]"));
		int r3 = Integer.parseInt(element.getText());     
		element = driver.findElement(By.xpath("(//td[text()='SAT Math'])/../td[3]"));
		int r4 = Integer.parseInt(element.getText());
		r1 = r1+r3;
		r2 = r2+r4;     
		info.put("SAT Range", r1 + "-" + r2);
		//System.out.println(info.get("SAT Range"));

	}
	
	public static void getPetersonData(String uniName) throws IOException, InterruptedException {
		searchFirstResult("\"" + uniName + "\" site: petersons.com");
		//Thread.sleep(2000);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//div[@id='factsDeadline'])/div/div[2]")));
		WebElement element = driver.findElement(By.xpath("(//div[@id='factsDeadline'])/div/div[2]"));
		String deadline = element.getText().split("\n")[0].trim();
		System.out.println("Deadline: " + deadline);
		info.put("Deadline", deadline);
	}
	
	public static WebElement searchFirstResult(String search) throws IOException, InterruptedException {
		driver.get("https://duckduckgo.com/");
		Thread.sleep(3000);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("q")));
		WebElement element = driver.findElement(By.name("q"));
		element.sendKeys(search);
		element.submit();
		System.out.println("Page title is: " + driver.getTitle());
		Thread.sleep(8000);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='result__a']")));
	    //element = driver.findElements(By.xpath("//a[@class='result__a']")).get(0);
	    element = driver.findElement(By.cssSelector("#r1-0 > div > h2 > a.result__a > b"));
	    //jse.executeScript("arguments[0].scrollIntoView()", element); 
		//actions.moveToElement(element).perform();
		element.click();
		//element.sendKeys(Keys.DOWN);
		//element.sendKeys(Keys.RETURN);
		return element;
	}

}
