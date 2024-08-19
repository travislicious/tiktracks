import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
    return (
        <main className="w-full h-full flex flex-col gap-4 p-4">
            <div className="flex w-full gap-2 items-center md:mb-2">
                <ArrowLeft className="md:size-10"/>
                <h1 className="font-bold md:text-3xl">Terms and Conditions</h1>
            </div>
            <p className="md:text-2xl"><strong>Last updated:</strong> 18/08/2024</p>

            <p className="md:text-lg">Welcome to TikTracks. These terms and conditions outline the rules and regulations for the use of our application. By accessing this application, we assume you accept these terms and conditions. Do not continue to use TikTracks if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2 className="font-bold md:text-xl">1. Definitions</h2>
            <p className="md:text-lg">1.1 "Application" refers to TikTracks.</p>
            <p className="md:text-lg">1.2 "User" refers to anyone who uses, downloads, installs, or accesses the Application.</p>
            <p className="md:text-lg">1.3 "We", "Us", and "Our" refer to the developers and operators of TikTracks.</p>

            <h2 className="font-bold md:text-xl">2. License</h2>
            <p className="md:text-lg">2.1 TikTracks grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Application strictly in accordance with these Terms.</p>

            <h2 className="font-bold md:text-xl">3. User Content</h2>
            <p className="md:text-lg">3.1 Our Application allows you to create, upload, and share content. You are responsible for the content you upload and share.</p>
            <p className="md:text-lg">3.2 You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.</p>
            <p className="md:text-lg">3.3 When you upload, submit, store, send, or receive content to or through our Application, you give TikTracks (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.</p>

            <h2 className="font-bold md:text-xl">4. Acceptable Use</h2>
            <p className="md:text-lg">4.1 You agree not to use the Application in any way that may cause harm to the Application, other users, or any other party.</p>
            <p className="md:text-lg">4.2 You agree not to use the Application to upload or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, or otherwise objectionable.</p>

            <h2 className="font-bold md:text-xl">5. Privacy</h2>
            <p className="md:text-lg">5.1 We are committed to protecting your privacy. Our Privacy Policy outlines our practices concerning data that you provide or that we may collect from you through the Application.</p>

            <h2 className="font-bold md:text-xl">6. Termination</h2>
            <p className="md:text-lg">6.1 We may terminate or suspend access to our Application immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2 className="font-bold md:text-xl">7. Limitation of Liability</h2>
            <p className="md:text-lg">7.1 To the fullest extent permitted by applicable law, in no event will TikTracks, its affiliates, directors, employees, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Application; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from the Application; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Application by any third party; (e) any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the Application, whether based on warranty, contract, tort (including negligence), or any other legal theory, and whether or not we have been informed of the possibility of such damage.</p>

            <h2 className="font-bold md:text-xl">8. Changes to These Terms</h2>
            <p className="md:text-lg">8.1 We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2 className="font-bold md:text-xl">9. Contact Us</h2>
            <p className="md:text-lg">9.1 If you have any questions about these Terms, please contact us at <a href="mailto:youngtravislicious@gmail.com" className="text-accent">youngtravislicious@gmail.com</a>.</p>

            <p className="md:text-lg">By using TikTracks, you agree to be bound by these Terms and Conditions.</p>
        </main>
    )
}