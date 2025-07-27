class DashboardPage {
  clickDirectoryMenu() {
    // Klik menu Directory di sidebar
    cy.get('a[href="/web/index.php/directory/viewDirectory"]').click()
  }


    // Verifikasi halaman Directory tampil
  verifyDirectoryPage() {
  cy.wait(1000); // opsional
  cy.get('.oxd-topbar-header-title', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Directory');
}


  filterByJobTitle(title) {
    // Klik filter job title dan pilih berdasarkan input
    cy.get('div[class*="oxd-select-text-input"]').first().click()
    cy.contains(title).click()
  }
}
export default DashboardPage
