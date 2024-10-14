import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import {TciFaqService} from "app/samin-gis/components/faq/tci-faq.service";
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';

@Component({
    selector: 'samin-tci-faq',
    templateUrl: './tci-faq.component.html',
    styleUrls: ['./tci-faq.component.css']
})
export class TciFAQComponent implements OnInit {

    faqList: any;
    faqListTitle: any[] = [];
    subjects: any=[];

    constructor(private router: Router, private faqService: TciFaqService) {
        // const elementsByTagName = document.getElementsByTagName("html")[0];
    }

    // getAllDataWithoutPagination() {
    //     this.faqService.getAllWithoutPagination().subscribe(res => {
    //         this.faqList = res
    //         console.log(res);
    //
    //     })
    // }
    
    
    onBackButton() {
        this.router.navigate(['/gis'])
    }
    
    ngOnInit() {
        this.getAllFaqCategory()


        
        // $(function () { 
        //     let Speed = 800;
        //     $('.questions dd').hide();
        //     $('.questions dt').click(function () {
        //         $(this).next(".questions dd").slideToggle(Speed);
        //         $(this).toggleClass("expanded_img");
        //     });
        // });

        // $(function () {


        // });

        document.getElementById('searchInput').addEventListener('keyup', function (event) {
            if (event.key === 'shift' || event.key === 'alt') {
                event.stopPropagation(); // جلوگیری از انتشار رویداد
            }
        });
        
        
        // هر بار که چیزی در فیلد جستجو وارد می‌شود
        $(document).ready(function () {
            $('#searchInput').on('keydown', function () {
                // @ts-ignore
                let value = $(this).val().toLowerCase(); // مقدار جستجو به حروف کوچک
                
                if(value.length === 0)
                    {
                        // @ts-ignore
                        $('.questions dt, .questions dd ,.lead').filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); // نمایش/عدم نمایش نتایج
                        });
                    }
                    

            });
            $("#searchInput").keyup(function (event) {
                if (event.keyCode === 13) {
                    // @ts-ignore
                    let value = $(this).val().toLowerCase(); // مقدار جستجو به حروف کوچک
                    // @ts-ignore
                    $('.questions dt, .questions dd ,.lead').filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); // نمایش/عدم نمایش نتایج
                    });
                }
            });
        });


//      // اضافه کردن رویداد کلیک به تیتر
// document.getElementById('pageTitle').addEventListener('click', function() {
//     // اسکرول به بالای صفحه
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });


        // $(document).ready(function () {
        //     $('#searchInput').on('keyup', function () {
        //         // @ts-ignore
        //         let searchValue = $(this).val().toLowerCase(); // مقدار جستجو
        //         let results = ''; // برای ذخیره نتایج جستجو
        //
        //         // فیلتر کردن سوالات
        //         $('dl.questions dt').each(function () {
            //
            //             let question = $(this).text().toLowerCase();
            //             let answer = $(this).next('dd').text().toLowerCase();
        //
        //             // if (question.includes(searchValue) || answer.includes(searchValue)) {
        //             //     results += '<dt>' + $(this).html() + '</dt>';
        //             //     results += '<dd>' + $(this).next('dd').html() + '</dd>';
        //             // }
        //         });
        //
        //         // نمایش نتایج در searchResults
        //         $('#searchResults').html(results);
        //     });
        // });


    }
    getAllFaqCategory(){
        
        this.faqService.getAllFAQCategory().subscribe(res=>{
            if(res.length>0)
            this.subjects=res.map(item=>({id:item[0],label:item[1]}))
            

            this.faqService.getAllWithoutPagination().pipe(
                map(items=>{
                return items.map(item=>{
                    item.title=this.subjects.find(titel=>titel.id===item.titleId).label
                    return item
                })
            })).subscribe(res => {
                this.faqList = res.sort((a, b) => (a.titleId === b.titleId ? 0 : a.titleId > b.titleId ? -1 : 1))
                let oldTitle: string = '';
    
                $(document).ready(function () {
                    let Speed = 800;
                    $('.questions div dd').hide();
                    $('.questions div dt').click(function () {
                        $(this).next(".questions div dd").slideToggle(Speed);
                        $(this).toggleClass("expanded_img");
                    });
                });
    
    
                this.faqList.forEach(lst => {
                    if (oldTitle !== lst.title) {
                        this.faqListTitle.push({id: lst.titleId, title: lst.title})
                        oldTitle = lst.title;
                    }
                })
                this.faqListTitle=[{id:-1,title:'سوالات اخیر'},...this.faqListTitle]

            })
        })
    }

}

