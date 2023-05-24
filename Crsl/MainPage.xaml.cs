using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using Xamarin.Forms;
using static System.Net.Mime.MediaTypeNames;
namespace Crsl
{
    public partial class MainPage : ContentPage
    {
        string text = "Raamat:Book;" + "Õun:Apple;" + "Lilled:Flowers;";
        Button corousel, uus_kart;
        Editor uus_eestisõna, uus_inglisesõna;
        Label uus;
        string path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Sona.txt");
        public MainPage()
        {
            InitializeComponent();

            File.WriteAllText(path, text);
            StackLayout stack = new StackLayout();
            corousel = new Button()
            {
                Text = "Eesti sõna ja selle tõlge",
                BackgroundColor = Color.Gray,
            };
            uus = new Label()
            {
                Text = "Kirjuta eesti sõna ja selle tõlge",
                BackgroundColor = Color.Gray
            };
            uus_eestisõna = new Editor()
            {
                Placeholder = "Eesti sõna"
            };
            uus_inglisesõna = new Editor()
            {
                Placeholder = "Inglise sõna"
            };
            uus_kart = new Button()
            {
                Text = "Lisa uus kart",
                BackgroundColor = Color.Gray
            };
            corousel.Clicked += Corousel_Clicked;
            stack.Children.Add(corousel);
            stack.Children.Add(uus);
            stack.Children.Add(uus_eestisõna);
            stack.Children.Add(uus_inglisesõna);
            stack.Children.Add(uus_kart);
            uus_kart.Clicked += Uus_kart_Clicked;
            Content = stack;
        }
        string uus_tekst;
        private void Uus_kart_Clicked(object sender, EventArgs e)
        {
            uus_tekst = uus_eestisõna.Text + ":" + uus_inglisesõna.Text + ";";
            File.AppendAllText(path, uus_tekst);
            uus_eestisõna.Text = null;
            uus_inglisesõna.Text = null;
        }

        private async void Corousel_Clicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new NavigationPage(new Lisa(path)));
        }
    }
}
