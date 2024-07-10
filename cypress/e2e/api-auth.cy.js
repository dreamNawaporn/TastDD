describe('API Testing without Token', () => {
    it('GET Users without Token', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/api/users',
        failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
      })
      .then((response) => {
        expect(response.status).to.eq(200);  
      });
    });
  
    it('POST User without Token', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/users',
        body: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.eq(400); 
      });
    });
  });
  
  describe('API Authentication', () => {
    it('POST Auth with correct credentials', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            body: {
              email: 'admin@example.com',
              password: 'password'
            },
            failOnStatusCode: false
          })
          .then((response) => {
            expect(response.status).to.eq(500);
      const token = response.body.token;

      // ทดสอบ GET Users ด้วย Token ที่ถูกต้อง
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/api/users',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  });
});