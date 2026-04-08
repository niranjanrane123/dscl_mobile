import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AddUrlToConfigFile {
    List<String> lines = new ArrayList<String>();
    String line = null;

    public static void main(String args[]) 
    {
    	String apkType	=	args[0];
    	
        AddUrlToConfigFile fr = new AddUrlToConfigFile();
        
        fr.doIt(args);
    }

    public void  doIt(String[] args) {
    	
    	String currentDir = System.getProperty("user.dir");
        System.out.println("Current dir using System:" +currentDir);

        String configFileFolder	=	currentDir+"/www/js/";
        	
		String configFile		=	"config.js";
		
		String completeFilePath	=	configFileFolder + configFile;
		
		System.out.println("-----completeFilePath-----"+completeFilePath);
		
	    String eip_Url_Replace 			= args[0];
		String base_Url_Replace 		= args[1];
		String brms_Url_Replace 		= args[2];
		String functionToPerform 		= args[3];

//		getFolderPath(configFileFolder);
		
        try {
            File f1 = new File(completeFilePath);
            FileReader fr = new FileReader(f1);
            BufferedReader br = new BufferedReader(fr);
            while ((line = br.readLine()) != null) 
            {
            	String eipUrlIp		=	eip_Url_Replace.split("-:")[1];
            	String baseUrlIp	=	base_Url_Replace.split("-:")[1];
            	String brmsUrlIp		=	brms_Url_Replace.split("-:")[1];
            	
            	if(line.contains("eip:") && line.contains("eipURL:") && functionToPerform.equalsIgnoreCase("add"))
            	{
                    line = line.replace("eip:",eip_Url_Replace.split("-:")[1]);
            	}
            	else if(line.contains(eipUrlIp)  && line.contains("eipURL:")  && functionToPerform.equalsIgnoreCase("remove"))
            	{
                    line = line.replace(eipUrlIp,"eip:");
            	}
            	
            	
            	if(line.contains("base:")  && line.contains("baseURL:")  && functionToPerform.equalsIgnoreCase("add"))
            	{
            		line = line.replace("base:",base_Url_Replace.split("-:")[1]);
            	}
            	else if(line.contains(baseUrlIp)  && line.contains("baseURL:")  && functionToPerform.equalsIgnoreCase("remove"))
            	{
                    line = line.replace(baseUrlIp,"base:");
            	}
            	
            	
            	if(line.contains("brms:")  && line.contains("brmsURL:")  && functionToPerform.equalsIgnoreCase("add"))
            	{
            		line = line.replace("brms:",brms_Url_Replace.split("-:")[1]);
            	}
            	else if(line.contains(brmsUrlIp)  && line.contains("brmsURL:")   && functionToPerform.equalsIgnoreCase("remove"))
            	{
                    line = line.replace(brmsUrlIp,"brms:");
            	}
                lines.add(line+"\n");
           }
            fr.close();
            br.close();

            FileWriter fw = new FileWriter(f1);
            BufferedWriter out = new BufferedWriter(fw);
            for(String s : lines)
                 out.write(s);
            out.flush();
            out.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
