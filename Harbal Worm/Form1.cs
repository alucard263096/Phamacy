using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Harbal_Worm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string zhongyaoUrl = "http://www.zhongyao.org.cn";
            int charStart = 65;
            Dictionary<string, string> dictHarbal = new Dictionary<string, string>();
            for (int i = 0; i < 26; i++)
            {
                string ch =Convert.ToChar(charStart + i).ToString();
                string harbalListUrl = zhongyaoUrl+ "/zycx/" + ch+"/";
                string nowurl = harbalListUrl;
                while (true)
                {
                    string htmlContent = getContent(nowurl);
                    if (htmlContent == ""||htmlContent.IndexOf("<!-- 位置 over -->")<0)
                    {
                        break;
                    }
                    //<div class="wzlb1"><a href="/zycx/B/200908/169424.html" title="百药煎" target="_blank">百药煎</a>2009-08-10 01:54:05</div>
                    string yaolistget = (htmlContent.Split(new string[] { "<!-- 位置 over -->" }, StringSplitOptions.RemoveEmptyEntries)[1])
                        .Split(new string[] { "<!-- 文字列表 over -->" }, StringSplitOptions.RemoveEmptyEntries)[0].Trim();
                    string[] str = yaolistget.Split(new string[] { "<div class=\"wzlb1\">" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var item in str)
                    {
                        if (item.IndexOf("<a ") == 0)
                        {
                            string[] streee = item.Split('"');
                            if (dictHarbal.Keys.Contains(streee[3]) == false)
                            {
                                dictHarbal.Add(streee[3], zhongyaoUrl+streee[1]);
                            }
                        }
                    }

                    if (htmlContent.IndexOf("下一页</a></li>") > 0)
                    {
                        Regex reg = new Regex(@"<li><a href='(\w+).html'>下一页</a></li>");
                        string source = htmlContent;
                        var result = reg.Match(source).Groups;
                        nowurl = harbalListUrl+ result[1]+".html" ;
                    }
                    else
                    {
                        break;
                    }

                }
            }

            StringBuilder sb = new StringBuilder();
            foreach (var item in dictHarbal)
            {
                sb.AppendFormat("{0},{1}\n", item.Key, item.Value);
            }
            string path = "d:\\harballist.csv";
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            Write(path, sb.ToString());

        }

        public static void Write(string path,string content)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            //开始写入
            sw.Write(content);
            //清空缓冲区
            sw.Flush();
            //关闭流
            sw.Close();
            fs.Close();
        }

        private string getContent(string harbalListUrl)
        {
            try
            {

                WebClient MyWebClient = new WebClient();


                MyWebClient.Credentials = CredentialCache.DefaultCredentials;//获取或设置用于向Internet资源的请求进行身份验证的网络凭据

                Byte[] pageData = MyWebClient.DownloadData(harbalListUrl); //从指定网站下载数据

                return Encoding.Default.GetString(pageData);  //如果获取网站页面采用的是GB2312，则使用这句            

                //string pageHtml = Encoding.UTF8.GetString(pageData); //如果获取网站页面采用的是UTF-8，则使用这句
                

            }

            catch (WebException webEx)
            {

            }
            return "";
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string path = "d:\\harballist.csv";
            string[] harbalContent=File.ReadAllLines(path);
            foreach (var item in harbalContent)
            {
                if (item.Trim() == "")
                {
                    continue;
                }
                string[] dd = item.Split(',');
                string url = dd[1];
                string content = getContent(url);
                Harbal harbal = new Harbal(content);

            }
        }
    }
}
