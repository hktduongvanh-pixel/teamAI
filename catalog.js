// 56 công cụ lấy từ Danh_sach_AI_mien_phi.docx. Mỗi mục là một agent trong web.
const CATEGORY_LABELS = {
  "code": "Lập trình",
  "image": "Ảnh & thiết kế",
  "writing": "Viết văn",
  "study": "Học tập",
  "research": "Nghiên cứu & thuyết trình",
  "media": "Video & âm thanh"
};
const CATALOG = [
 {
  "cat": "code",
  "name": "ChatGPT",
  "func": "Viết code, giải thích lỗi, phân tích log và hỗ trợ nhiều ngôn ngữ lập trình.",
  "url": "https://chatgpt.com/",
  "free": "Có gói miễn phí, giới hạn theo mức sử dụng.",
  "key": "t01",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Google Gemini",
  "func": "Sinh code, giải thích chương trình, hỗ trợ phân tích tài liệu và lỗi.",
  "url": "https://gemini.google.com/",
  "free": "Có gói miễn phí.",
  "key": "t02",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Claude",
  "func": "Phân tích code dài, sửa lỗi, giải thích và hỗ trợ dự án nhiều tệp.",
  "url": "https://claude.ai/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t03",
  "paid": true,
  "gen": false
 },
 {
  "cat": "code",
  "name": "DeepSeek",
  "func": "Hỗ trợ Java, Python, thuật toán, debug và giải thích code.",
  "url": "https://chat.deepseek.com/",
  "free": "Có thể dùng miễn phí; hạn mức có thể thay đổi.",
  "key": "t04",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "GitHub Copilot",
  "func": "Gợi ý và hoàn thành code ngay trong môi trường lập trình.",
  "url": "https://github.com/features/copilot",
  "free": "Có gói Free giới hạn.",
  "key": "t05",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Cursor",
  "func": "Trình soạn thảo code tích hợp AI, hỗ trợ sửa nhiều tệp.",
  "url": "https://cursor.com/",
  "free": "Có gói Hobby giới hạn.",
  "key": "t06",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Windsurf",
  "func": "Hỗ trợ hiểu dự án, tạo và chỉnh sửa code.",
  "url": "https://windsurf.com/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t07",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Replit",
  "func": "Viết, chạy thử và triển khai ứng dụng trực tuyến.",
  "url": "https://replit.com/",
  "free": "Có gói Starter miễn phí.",
  "key": "t08",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "Tabnine",
  "func": "Gợi ý code và hỗ trợ lập trình trong IDE.",
  "url": "https://www.tabnine.com/",
  "free": "Có lựa chọn miễn phí/dùng thử tùy thời điểm.",
  "key": "t09",
  "paid": false,
  "gen": false
 },
 {
  "cat": "code",
  "name": "BLACKBOX AI",
  "func": "Sinh code, tìm kiếm đoạn code và hỗ trợ lập trình.",
  "url": "https://www.blackbox.ai/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t10",
  "paid": false,
  "gen": false
 },
 {
  "cat": "image",
  "name": "Canva",
  "func": "Thiết kế poster, banner, bài thuyết trình và chỉnh sửa ảnh bằng công cụ AI.",
  "url": "https://www.canva.com/",
  "free": "Có gói Free; một số tính năng AI trả phí hoặc giới hạn.",
  "key": "t11",
  "paid": false,
  "gen": false
 },
 {
  "cat": "image",
  "name": "Microsoft Designer",
  "func": "Tạo hình ảnh và thiết kế từ mô tả văn bản.",
  "url": "https://designer.microsoft.com/",
  "free": "Tính năng và lượt dùng miễn phí có thể thay đổi.",
  "key": "t12",
  "paid": false,
  "gen": true
 },
 {
  "cat": "image",
  "name": "Adobe Firefly",
  "func": "Tạo ảnh, hiệu ứng và chỉnh sửa hình ảnh bằng AI.",
  "url": "https://firefly.adobe.com/",
  "free": "Có lượt tạo miễn phí giới hạn.",
  "key": "t13",
  "paid": false,
  "gen": true
 },
 {
  "cat": "image",
  "name": "Photopea",
  "func": "Chỉnh sửa ảnh trực tuyến, hỗ trợ PSD và layer.",
  "url": "https://www.photopea.com/",
  "free": "Dùng miễn phí có quảng cáo.",
  "key": "t14",
  "paid": false,
  "gen": false
 },
 {
  "cat": "image",
  "name": "Pixlr",
  "func": "Chỉnh ảnh, xóa nền, tạo ảnh và thiết kế trực tuyến.",
  "url": "https://pixlr.com/",
  "free": "Có tính năng miễn phí và giới hạn.",
  "key": "t15",
  "paid": false,
  "gen": true
 },
 {
  "cat": "image",
  "name": "remove.bg",
  "func": "Tự động tách chủ thể và xóa nền ảnh.",
  "url": "https://www.remove.bg/",
  "free": "Xem trước miễn phí; tải chất lượng cao có thể tính phí.",
  "key": "t16",
  "paid": false,
  "gen": false
 },
 {
  "cat": "image",
  "name": "Leonardo AI",
  "func": "Tạo ảnh, nhân vật, hình nền và concept art.",
  "url": "https://leonardo.ai/",
  "free": "Có hạn mức miễn phí tùy thời điểm.",
  "key": "t17",
  "paid": false,
  "gen": true
 },
 {
  "cat": "image",
  "name": "Ideogram",
  "func": "Tạo hình ảnh, poster, logo và chữ trong ảnh.",
  "url": "https://ideogram.ai/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t18",
  "paid": false,
  "gen": true
 },
 {
  "cat": "image",
  "name": "Clipdrop",
  "func": "Xóa vật thể, thay nền, làm nét và xử lý hình ảnh.",
  "url": "https://clipdrop.co/",
  "free": "Một số công cụ miễn phí có giới hạn.",
  "key": "t19",
  "paid": false,
  "gen": false
 },
 {
  "cat": "image",
  "name": "GIMP",
  "func": "Phần mềm chỉnh sửa ảnh trên máy tính, hỗ trợ layer.",
  "url": "https://www.gimp.org/",
  "free": "Phần mềm miễn phí, mã nguồn mở.",
  "key": "t20",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "ChatGPT",
  "func": "Viết nghị luận, lập dàn ý, phân tích tác phẩm và sửa diễn đạt.",
  "url": "https://chatgpt.com/",
  "free": "Có gói miễn phí.",
  "key": "t21",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Google Gemini",
  "func": "Viết nội dung, tóm tắt và triển khai ý tưởng.",
  "url": "https://gemini.google.com/",
  "free": "Có gói miễn phí.",
  "key": "t22",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "QuillBot",
  "func": "Viết lại câu, diễn đạt và tóm tắt văn bản.",
  "url": "https://quillbot.com/",
  "free": "Bản miễn phí giới hạn tính năng/dung lượng.",
  "key": "t23",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Grammarly",
  "func": "Kiểm tra chính tả và ngữ pháp, chủ yếu cho tiếng Anh.",
  "url": "https://www.grammarly.com/",
  "free": "Có gói miễn phí.",
  "key": "t24",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "DeepSeek",
  "func": "Phân tích đề, lập luận và phát triển nội dung bài viết.",
  "url": "https://chat.deepseek.com/",
  "free": "Có thể dùng miễn phí; hạn mức thay đổi.",
  "key": "t25",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Claude",
  "func": "Soạn thảo, biên tập và cải thiện văn bản dài.",
  "url": "https://claude.ai/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t26",
  "paid": true,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Rytr",
  "func": "Viết nội dung ngắn, giới thiệu và quảng cáo.",
  "url": "https://rytr.me/",
  "free": "Gói miễn phí/dùng thử có giới hạn tùy thời điểm.",
  "key": "t27",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "LanguageTool",
  "func": "Kiểm tra lỗi chính tả và ngữ pháp nhiều ngôn ngữ.",
  "url": "https://languagetool.org/",
  "free": "Có bản miễn phí.",
  "key": "t28",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Notion AI",
  "func": "Ghi chú, tóm tắt và soạn thảo trong Notion.",
  "url": "https://www.notion.com/",
  "free": "AI có giới hạn dùng thử hoặc yêu cầu gói trả phí.",
  "key": "t29",
  "paid": false,
  "gen": false
 },
 {
  "cat": "writing",
  "name": "Writesonic",
  "func": "Hỗ trợ viết bài, nội dung website và quảng cáo.",
  "url": "https://writesonic.com/",
  "free": "Gói miễn phí/dùng thử tùy thời điểm.",
  "key": "t30",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Photomath",
  "func": "Chụp bài toán và xem hướng dẫn giải từng bước.",
  "url": "https://photomath.com/",
  "free": "Có tính năng miễn phí; nội dung nâng cao có thể trả phí.",
  "key": "t31",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Microsoft Math Solver",
  "func": "Giải toán, phương trình và hỗ trợ đồ thị.",
  "url": "https://mathsolver.microsoft.com/",
  "free": "Miễn phí theo dịch vụ hiện có.",
  "key": "t32",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Wolfram Alpha",
  "func": "Tính toán, toán học, khoa học và công thức.",
  "url": "https://www.wolframalpha.com/",
  "free": "Có bản miễn phí; lời giải từng bước có thể trả phí.",
  "key": "t33",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Quizlet",
  "func": "Thẻ ghi nhớ, từ vựng và bộ câu hỏi ôn tập.",
  "url": "https://quizlet.com/",
  "free": "Có gói miễn phí, một số tính năng trả phí.",
  "key": "t34",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Khan Academy",
  "func": "Học toán, khoa học, lịch sử và nhiều môn học.",
  "url": "https://www.khanacademy.org/",
  "free": "Nội dung học cốt lõi miễn phí.",
  "key": "t35",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "StudyFetch",
  "func": "Tạo tài liệu ôn tập, câu hỏi và flashcard từ tài liệu.",
  "url": "https://www.studyfetch.com/",
  "free": "Có hạn mức miễn phí tùy thời điểm.",
  "key": "t36",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "NotebookLM",
  "func": "Đọc PDF/tài liệu, hỏi đáp theo nguồn và tóm tắt.",
  "url": "https://notebooklm.google.com/",
  "free": "Có gói miễn phí với giới hạn sử dụng.",
  "key": "t37",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Duolingo",
  "func": "Học tiếng Anh và ngoại ngữ qua bài học tương tác.",
  "url": "https://www.duolingo.com/",
  "free": "Có phiên bản miễn phí có quảng cáo/giới hạn.",
  "key": "t38",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Question AI",
  "func": "Hỗ trợ giải bài qua câu hỏi hoặc hình ảnh.",
  "url": "https://www.questionai.com/",
  "free": "Có thể có giới hạn miễn phí.",
  "key": "t39",
  "paid": false,
  "gen": false
 },
 {
  "cat": "study",
  "name": "Gauth",
  "func": "Hỗ trợ giải bài tập, đặc biệt là toán, từ ảnh đề.",
  "url": "https://www.gauthmath.com/",
  "free": "Có thể có giới hạn miễn phí.",
  "key": "t40",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Perplexity",
  "func": "Tìm kiếm thông tin và tổng hợp câu trả lời kèm nguồn tham khảo.",
  "url": "https://www.perplexity.ai/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t41",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Microsoft Copilot",
  "func": "Hỏi đáp, tìm thông tin và hỗ trợ tạo nội dung.",
  "url": "https://copilot.microsoft.com/",
  "free": "Có quyền truy cập miễn phí với giới hạn.",
  "key": "t42",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Google AI Studio",
  "func": "Thử nghiệm mô hình AI và xây dựng ứng dụng/API.",
  "url": "https://aistudio.google.com/",
  "free": "Có mức sử dụng miễn phí theo điều kiện và hạn mức.",
  "key": "t43",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Gamma",
  "func": "Tạo slide, bài thuyết trình và tài liệu.",
  "url": "https://gamma.app/",
  "free": "Có gói miễn phí theo hạn mức/credit.",
  "key": "t44",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Consensus",
  "func": "Tìm kiếm và tổng hợp nghiên cứu khoa học.",
  "url": "https://consensus.app/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t45",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Elicit",
  "func": "Tìm và phân tích bài nghiên cứu khoa học.",
  "url": "https://elicit.com/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t46",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Figma",
  "func": "Thiết kế giao diện, sơ đồ và cộng tác thiết kế.",
  "url": "https://www.figma.com/",
  "free": "Có gói Starter miễn phí.",
  "key": "t47",
  "paid": false,
  "gen": false
 },
 {
  "cat": "research",
  "name": "Explainpaper",
  "func": "Giải thích nội dung bài báo và tài liệu học thuật.",
  "url": "https://www.explainpaper.com/",
  "free": "Kiểm tra hạn mức miễn phí hiện hành.",
  "key": "t48",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "CapCut",
  "func": "Chỉnh sửa video, phụ đề tự động và công cụ AI.",
  "url": "https://www.capcut.com/",
  "free": "Có công cụ miễn phí; một số tính năng Pro trả phí.",
  "key": "t49",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "Runway",
  "func": "Tạo và chỉnh sửa video bằng AI.",
  "url": "https://runwayml.com/",
  "free": "Có thể có credit dùng thử/miễn phí giới hạn.",
  "key": "t50",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "Pika",
  "func": "Tạo video từ văn bản hoặc hình ảnh.",
  "url": "https://pika.art/",
  "free": "Có hạn mức miễn phí tùy thời điểm.",
  "key": "t51",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "Kling AI",
  "func": "Tạo video bằng mô tả và hình ảnh.",
  "url": "https://klingai.com/",
  "free": "Có thể có credit miễn phí giới hạn.",
  "key": "t52",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "Suno",
  "func": "Sáng tác nhạc bằng mô tả văn bản.",
  "url": "https://suno.com/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t53",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "ElevenLabs",
  "func": "Tạo giọng đọc và chuyển văn bản thành giọng nói.",
  "url": "https://elevenlabs.io/",
  "free": "Có gói miễn phí giới hạn.",
  "key": "t54",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "TTSMaker",
  "func": "Chuyển văn bản thành giọng nói.",
  "url": "https://ttsmaker.com/",
  "free": "Có hạn mức miễn phí.",
  "key": "t55",
  "paid": false,
  "gen": false
 },
 {
  "cat": "media",
  "name": "Whisper",
  "func": "Nhận dạng giọng nói và chuyển âm thanh thành văn bản.",
  "url": "https://github.com/openai/whisper",
  "free": "Mã nguồn mở; chạy cục bộ cần máy tính phù hợp.",
  "key": "t56",
  "paid": false,
  "gen": false
 }
];
