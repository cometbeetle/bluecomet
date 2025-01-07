document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const fullname = document.getElementById('fullname').value.trim();


    if (!email || !password || !fullname) {
        alert("At least one field is missing.");
        return;
    }

    // Generate the iOS configuration profile XML
    const xmlProfile = generateProfileXML(email, password, fullname);

    // Create a Blob with the XML data
    const blob = new Blob([xmlProfile], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.mobileconfig';
    a.click();
    
    // Show success message
    document.getElementById('message').textContent = 'Profile has been generated and downloaded!';
});

function generateProfileXML(email, password, fullname) {
    const uuid1 = '9f775944-36b5-4f43-9efb-06051e024158'; // Example static UUID, can be generated dynamically if needed
    const uuid2 = '157cc241-437e-4ba6-9238-2aa6a862f8c9';

    // Replace placeholders with user input
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>BlueComet Mail</string>
			<key>EmailAccountName</key>
			<string>${fullname}</string>
			<key>EmailAccountType</key>
			<string>EmailTypeIMAP</string>
			<key>EmailAddress</key>
			<string>${email}</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>mx1.admin.bcomet.net</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>993</integer>
			<key>IncomingMailServerUseSSL</key>
			<true/>
			<key>IncomingMailServerUsername</key>
			<string>${email}</string>
			<key>IncomingPassword</key>
			<string>${password}</string>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>mx1.admin.bcomet.net</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>587</integer>
			<key>OutgoingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingPassword</key>
			<string>${password}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>PayloadDisplayName</key>
			<string>Mail</string>
			<key>PayloadIdentifier</key>
			<string>com.apple.mail.managed.${uuid1}</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>${uuid1}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
		</dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>BlueComet Networks Mail Profile</string>
	<key>PayloadIdentifier</key>
	<string>bluecomet.${uuid2}</string>
	<key>PayloadOrganization</key>
	<string>BlueComet Networks</string>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${uuid2}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;
}
