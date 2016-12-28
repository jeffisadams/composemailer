import * as bp from 'babyparse';
import { BaseTemplate } from './template/basetemplate/';
import { TemplateFactory } from './template/index';
import { ParentTemplate } from './template/parenttemplate/index';
import { CompiledTemplate } from './template/basetemplate/index';


export class FileService {
  sections: BaseTemplate[] = [];

  basePath: string;
  constructor() {}

  async loadFile(path: string) {
    try {
      let contents: BabyParse.ParseResult = bp.parseFiles(path, {
        header: true
      });

      this.sections = contents.data
        .filter(row => row.key)
        .map((data,i) => {
          data.order = i;
          return data;
        })
        .map((data) => TemplateFactory.getTemplateClass(data));

      await Promise.all(this.sections.map(template => template.build() ));
    } catch(err) {
      console.log("Failed in the component build");
      console.log(err);
      throw new Error(err);
    }
  }

  async processEmail(): Promise<CompiledTemplate> {
    let parent = new ParentTemplate({
      order: -1,
      title: '',
      sections: this.sections
    });

    try {
      await parent.build();
    } catch(err) {
      console.log("Coalation error");
      console.log(err);
      throw new Error(err);
    }

    return parent.compiledTemplate;
  }

}