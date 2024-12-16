describe('Add Product to cart successfully', () => {
// Scenario1:
// 1) Add 'Mocha' to the cart by clicking on it
// 2) Add 'Americano' to the cart by clicking on it
// 3) Hover of the Total on the bottom right, add 1 more 'Mocha'
// 4) Add 'Expresso' to the cart by clicking on it - click on it 3 times
// you should have 6 items as of now
// 5) You should see that 'It's your lucky day! Get an extra cup' (Mocha) - click 'yes of course' - you should now have 7 items
// Add testing throughout the process to make sure it correctly populated the cart
// add testing where instead of hovering on total you click instead - it should ask for 'Payment details'
    
    beforeEach(() => {
        cy.visit('/');
        cy.title().should('eq', 'Coffee cart');
    });
  
    it('should view details of cart', () => {
        // 1) Add 'Mocha' to the cart by clicking on it
        cy.get('[data-test="Mocha"]').should("be.visible").click()
        cy.contains('a',"cart (1)").should("be.visible")
        cy.contains('a',"cart").click()
        cy.get(".list-header")
          .parent()
          .within( () => {
            cy.contains("Mocha").should("be.visible")
              .parent(".list-item")
              .within( () => {
                cy.contains('x 1').should("be.visible")
              })
          })
        cy.wait(1000)

        // 2) Add 'Americano' to the cart by clicking on it
        cy.contains("menu").click()
        cy.get('[data-test="Americano"]').should("be.visible").click()
        cy.contains('a',"cart (2)").should("be.visible")
        cy.contains('a',"cart").click()
        cy.get(".list-header")
          .parent()
          .within( () => {
            cy.contains("Americano").should("be.visible")
              .parent(".list-item")
              .within( () => {
                cy.contains('x 1').should("be.visible")
              })
          })
        cy.wait(1000)

        // 3) Hover of the Total on the bottom right, add 1 more 'Mocha'
        cy.contains("menu").click()
        cy.get('[data-test="checkout"]').should("be.visible").trigger('mouseover')
        cy.get('[aria-label="Add one Mocha"]').click()
        cy.contains('Mocha x 2').should("be.visible")
        cy.contains('a',"cart (3)").should("be.visible")
        cy.contains('a',"cart").click()
        cy.get(".list-header")
          .parent()
          .within( () => {
            cy.contains("Mocha").should("be.visible")
              .parent(".list-item")
              .within( () => {
                cy.contains('x 2').should("be.visible")
              })

          })
        cy.wait(1000)
        
        // 4) Add 'Expresso' to the cart by clicking on it - click on it 3 times
        cy.contains("menu").click()
        cy.get('[data-test="Espresso"]').should("be.visible")
          .click()
          .click()
          .click()
        cy.wait(1000)
        
        // 5) You should see that 'It's your lucky day! Get an extra cup' (Mocha) - click 'yes of course'
        cy.contains("It's your lucky day! Get an extra cup of Mocha for $4.")
        cy.contains("button","Yes, of course!").click()
        cy.contains("cart (7)").should("be.visible")
        cy.get('a[href="/cart"]').should("be.visible").click()
        cy.get(".list-header").should("be.visible")
          .parent()
          .within( () => {
            
            cy.contains("(Discounted) Mocha").should("be.visible")
              .parent(".list-item")
              .within( () => {
                cy.contains('x 1').should("be.visible")
              })


            cy.contains("Espresso").should("be.visible")
              .parent(".list-item")
              .within( () => {
                cy.contains('x 3').should("be.visible")
              })
              
          })
        cy.wait(1000)

    });

    it('should checkout successfully', () => {
        // 1) Add 'Mocha' to the cart by clicking on it
        cy.get('[data-test="Mocha"]').should("be.visible").click()
        cy.wait(1000)
        // 2) Add 'Americano' to the cart by clicking on it
        cy.get('[data-test="Americano"]').should("be.visible").click()
        cy.wait(1000)
        // 3) Hover of the Total on the bottom right, add 1 more 'Mocha'
        cy.get('[data-test="checkout"]').should("be.visible").trigger('mouseover')
        cy.get('[aria-label="Add one Mocha"]').click()
        cy.contains('Mocha x 2').should("be.visible")
        cy.wait(1000)
        // 4) Add 'Expresso' to the cart by clicking on it - click on it 3 times
        cy.get('[data-test="Espresso"]').should("be.visible")
          .click()
          .click()
          .click()
        cy.contains('a',"cart (6)").should("be.visible")
        cy.wait(1000)
        // 5) You should see that 'It's your lucky day! Get an extra cup' (Mocha) - click 'yes of course'
        cy.contains("It's your lucky day! Get an extra cup of Mocha for $4.")
        cy.contains("button","Yes, of course!").click()
        cy.wait(1000)

        // checkout
        cy.get('[data-test="checkout"]').click()
        cy.contains("h1","Payment details").should("be.visible")
        cy.get("#name").type("TEST")
        cy.get("#email").type("atp@yopmail.com")
        cy.get("#submit-payment").click()
        cy.contains("Thanks for your purchase. Please check your email for payment.").should("be.visible")
        cy.wait(1000)
    });
  
   
});
  