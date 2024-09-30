namespace OilNewsAPI.BLL.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Icon { get; set; }
        public string Publisher { get; set; }
        public string PublisherIcon { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
