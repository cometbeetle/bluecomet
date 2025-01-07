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
    const uuid1 = 'E040B6E0-0F9E-44AE-BC4A-EC9AF0CD9749'; // Example static UUIDs, can be generated dynamically if needed
    const uuid2 = '0B171773-4B26-4A3D-8BCF-490D3AE87A7F';
	const uuid3 = '8C9FACBA-89CF-43EF-BC63-88F2FD1270AF';

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
			<key>OutgoingMailServerUseSSL</key>
			<true/>
			<key>OutgoingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>PayloadDescription</key>
			<string>Configures Email settings</string>
			<key>PayloadDisplayName</key>
			<string>BlueComet Networks</string>
			<key>PayloadIdentifier</key>
			<string>com.apple.mail.managed.${uuid1}</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>${uuid1}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>SMIMEEnableEncryptionPerMessageSwitch</key>
			<false/>
			<key>SMIMEEnablePerMessageSwitch</key>
			<false/>
			<key>SMIMEEnabled</key>
			<false/>
			<key>SMIMEEncryptByDefault</key>
			<false/>
			<key>SMIMEEncryptByDefaultUserOverrideable</key>
			<false/>
			<key>SMIMEEncryptionEnabled</key>
			<false/>
			<key>SMIMESigningEnabled</key>
			<false/>
			<key>SMIMESigningUserOverrideable</key>
			<false/>
			<key>allowMailDrop</key>
			<false/>
			<key>disableMailRecentsSyncing</key>
			<false/>
		</dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>BlueComet Networks Mail Profile</string>
	<key>PayloadIdentifier</key>
	<string>bluecomet.${uuid2}</string>
	<key>PayloadOrganization</key>
	<string>BlueComet Networks</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${uuid3}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;
}
