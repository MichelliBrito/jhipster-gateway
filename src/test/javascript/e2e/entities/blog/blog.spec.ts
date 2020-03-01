import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BlogComponentsPage, BlogDeleteDialog, BlogUpdatePage } from './blog.page-object';

const expect = chai.expect;

describe('Blog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogComponentsPage: BlogComponentsPage;
  let blogUpdatePage: BlogUpdatePage;
  let blogDeleteDialog: BlogDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Blogs', async () => {
    await navBarPage.goToEntity('blog');
    blogComponentsPage = new BlogComponentsPage();
    await browser.wait(ec.visibilityOf(blogComponentsPage.title), 5000);
    expect(await blogComponentsPage.getTitle()).to.eq('blogApp.blog.home.title');
    await browser.wait(ec.or(ec.visibilityOf(blogComponentsPage.entities), ec.visibilityOf(blogComponentsPage.noResult)), 1000);
  });

  it('should load create Blog page', async () => {
    await blogComponentsPage.clickOnCreateButton();
    blogUpdatePage = new BlogUpdatePage();
    expect(await blogUpdatePage.getPageTitle()).to.eq('blogApp.blog.home.createOrEditLabel');
    await blogUpdatePage.cancel();
  });

  it('should create and save Blogs', async () => {
    const nbButtonsBeforeCreate = await blogComponentsPage.countDeleteButtons();

    await blogComponentsPage.clickOnCreateButton();

    await promise.all([blogUpdatePage.setNameInput('name'), blogUpdatePage.setHandleInput('handle')]);

    expect(await blogUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await blogUpdatePage.getHandleInput()).to.eq('handle', 'Expected Handle value to be equals to handle');

    await blogUpdatePage.save();
    expect(await blogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Blog', async () => {
    const nbButtonsBeforeDelete = await blogComponentsPage.countDeleteButtons();
    await blogComponentsPage.clickOnLastDeleteButton();

    blogDeleteDialog = new BlogDeleteDialog();
    expect(await blogDeleteDialog.getDialogTitle()).to.eq('blogApp.blog.delete.question');
    await blogDeleteDialog.clickOnConfirmButton();

    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
